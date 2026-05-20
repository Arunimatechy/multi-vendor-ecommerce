import razorpay

from django.conf import settings


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Payment
from .serializers import PaymentSerializer
from orders.models import Order


# =========================================
# 🔧 RAZORPAY CLIENT
# =========================================

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)


# =========================================
# 💳 CREATE RAZORPAY ORDER
# =========================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_razorpay_order(request, order_id):

    try:
        order = Order.objects.get(
            id=order_id,
            customer=request.user
        )
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    # FIX: ensure correct amount source
    amount = int(order.total_price * 100)

    razorpay_order = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    })

    payment = Payment.objects.create(
        order=order,
        payment_method='razorpay',
        payment_status='pending',
        amount=order.total_price,
        razorpay_order_id=razorpay_order['id']  # ✅ FIXED (separate field)
    )

    return Response({
        "razorpay_order_id": razorpay_order['id'],
        "amount": amount,
        "key": settings.RAZORPAY_KEY_ID,
        "payment_id": payment.id
    })
    

    


# =========================================
# 🔐 PAYMENT SUCCESS (SECURE VERIFICATION)
# =========================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def payment_success(request):

    data = request.data

    razorpay_payment_id = data.get('razorpay_payment_id')
    razorpay_order_id = data.get('razorpay_order_id')
    razorpay_signature = data.get('razorpay_signature')
    payment_id = data.get('payment_id')

    if not all([razorpay_payment_id, razorpay_order_id, razorpay_signature, payment_id]):
        return Response({"error": "Missing payment data"}, status=400)

    try:
        payment = Payment.objects.get(
            id=payment_id,
            razorpay_order_id=razorpay_order_id
        )
    except Payment.DoesNotExist:
        return Response({"error": "Payment not found"}, status=404)

    params_dict = {
        'razorpay_order_id': razorpay_order_id,
        'razorpay_payment_id': razorpay_payment_id,
        'razorpay_signature': razorpay_signature
    }

    try:
        client.utility.verify_payment_signature(params_dict)

    except razorpay.errors.SignatureVerificationError:
        payment.payment_status = "failed"
        payment.save()
        return Response({"error": "Invalid signature"}, status=400)

    # SUCCESS
    payment.payment_status = "completed"
    payment.razorpay_payment_id = razorpay_payment_id  # ✅ FIX
    payment.save()

    return Response({"message": "Payment successful"})
          
    

# =========================================
# 💵 CASH ON DELIVERY
# =========================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cash_on_delivery(request, order_id):

    try:
        order = Order.objects.get(
            id=order_id,
            customer=request.user
        )
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    Payment.objects.create(
        order=order,
        payment_method='cod',
        payment_status='pending',
        amount=order.total_price
    )

    return Response({"message": "COD order placed successfully"})


# =========================================
# 📊 PAYMENT HISTORY
# =========================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payment_history(request):

    payments = Payment.objects.filter(
        order__customer=request.user
    ).order_by('-created_at')

    serializer = PaymentSerializer(payments, many=True)

    return Response(serializer.data)