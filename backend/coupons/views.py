from decimal import Decimal

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone

from .models import Coupon
from .serializers import CouponSerializer


# =========================================
# 🎟 GET ALL ACTIVE COUPONS
# =========================================
@api_view(['GET'])
def coupon_list(request):

    coupons = Coupon.objects.filter(
        active=True
    )

    serializer = CouponSerializer(
        coupons,
        many=True
    )

    return Response(serializer.data)


# =========================================
# 🎟 APPLY COUPON
# =========================================
@api_view(['POST'])
def apply_coupon(request):

    code = request.data.get('code')

    print("Coupon:", code)

    if not code:

        return Response(
            {
                "error": "Coupon code required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:

        coupon = Coupon.objects.get(
            code__iexact=code.strip(),
            active=True
        )

    except Coupon.DoesNotExist:

        return Response(
            {
                "error": "Invalid coupon"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    # ✅ CHECK EXPIRY
    if coupon.expiry_date < timezone.now():

        return Response(
            {
                "error": "Coupon expired"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ CART TOTAL
    cart_total = Decimal(
        str(
            request.data.get(
                "cart_total",
                0
            )
        )
    )

    print("Cart Total:", cart_total)

    # ✅ MINIMUM AMOUNT
    if cart_total < coupon.minimum_amount:

        return Response(
            {
                "error":
                f"Minimum amount should be ₹{coupon.minimum_amount}"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # ✅ DISCOUNT
    discount = Decimal("0")

    if coupon.discount_type == 'percentage':

        discount = (
            cart_total *
            coupon.discount_value
        ) / Decimal("100")

    elif coupon.discount_type == 'flat':

        discount = coupon.discount_value

    # ✅ FINAL AMOUNT
    final_amount = cart_total - discount

    if final_amount < 0:

        final_amount = Decimal("0")

    return Response({

        "coupon": coupon.code,

        "cart_total": float(cart_total),

        "discount": float(discount),

        "final_amount": float(final_amount),

        "discount_type":
        coupon.discount_type
    })