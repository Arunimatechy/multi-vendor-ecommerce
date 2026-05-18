from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Avg, Count

from .models import Review
from .serializers import ReviewSerializer

from products.models import Product
from vendors.models import VendorStore
from vendors.permissions import IsVendor
from orders.models import OrderItem


# =========================================
# ⭐ ADD REVIEW (ONLY IF DELIVERED)
# =========================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_review(request, product_id):

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # ✅ CHECK PURCHASE + DELIVERED
    purchased = OrderItem.objects.filter(
    order__customer=request.user,
    vendor_status__iexact="delivered",
    product_id=product_id
).exists()

    if not purchased:
        return Response(
            {"error": "You can review only after delivery"},
            status=status.HTTP_403_FORBIDDEN
        )

    # ❌ PREVENT DUPLICATE REVIEW
    already_reviewed = Review.objects.filter(
        user=request.user,
        product=product
    ).exists()

    if already_reviewed:
        return Response(
            {"error": "You already reviewed this product"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = ReviewSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user, product=product)
        return Response(
            {"message": "Review added successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================================
# 📦 PRODUCT REVIEWS (PUBLIC)
# =========================================
@api_view(['GET'])
@permission_classes([AllowAny])
def product_reviews(request, product_id):

    reviews = Review.objects.filter(
        product_id=product_id
    ).order_by('-created_at')

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


# =========================================
# ✏️ EDIT REVIEW
# =========================================
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_review(request, id):

    try:
        review = Review.objects.get(id=id, user=request.user)
    except Review.DoesNotExist:
        return Response(
            {"error": "Review not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ReviewSerializer(review, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Review updated successfully"})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================================
# ❌ DELETE REVIEW
# =========================================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_review(request, id):

    try:
        review = Review.objects.get(id=id, user=request.user)
    except Review.DoesNotExist:
        return Response(
            {"error": "Review not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    review.delete()

    return Response({"message": "Review deleted successfully"})


# =========================================
# 📊 AVERAGE RATING
# =========================================
@api_view(['GET'])
@permission_classes([AllowAny])
def product_average_rating(request, product_id):

    average = Review.objects.filter(
        product_id=product_id
    ).aggregate(Avg('rating'))

    avg = average['rating__avg'] or 0

    return Response({
        "average_rating": round(avg, 1)
    })


# =========================================
# 🏪 VENDOR REVIEWS
# =========================================
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsVendor])
def vendor_reviews(request):

    try:
        vendor_store = VendorStore.objects.get(vendor=request.user)
    except VendorStore.DoesNotExist:
        return Response(
            {"error": "Vendor store not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    reviews = Review.objects.filter(
        product__vendor=request.user
    ).order_by('-created_at')

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


# =========================================
# ⭐ CAN USER WRITE REVIEW? (FRONTEND CHECK)
# =========================================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def can_write_review(request, product_id):

    already_reviewed = Review.objects.filter(
        user=request.user,
        product_id=product_id
    ).exists()

    can_review = OrderItem.objects.filter(
    order__customer=request.user,
    vendor_status__iexact="delivered",
    product_id=product_id
).exists()

    return Response({
        "can_review": can_review and not already_reviewed
    })