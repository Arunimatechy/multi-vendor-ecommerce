from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import status

from .models import Wishlist
from .serializers import WishlistSerializer

from products.models import Product
from cart.models import CartItem


# =========================================
# ❤️ ADD TO WISHLIST
# =========================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def add_to_wishlist(request, product_id):

    try:

        product = Product.objects.get(
            id=product_id
        )

    except Product.DoesNotExist:

        return Response(
            {
                "error": "Product not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    wishlist_item, created = Wishlist.objects.get_or_create(

        user=request.user,

        product=product
    )

    if not created:

        return Response(
            {
                "message": "Already in wishlist"
            }
        )

    return Response(
        {
            "message": "Added to wishlist"
        }
    )


# =========================================
# 📋 MY WISHLIST
# =========================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def my_wishlist(request):

    wishlist = Wishlist.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = WishlistSerializer(
        wishlist,
        many=True
    )

    return Response(serializer.data)


# =========================================
# ❌ REMOVE WISHLIST ITEM
# =========================================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def remove_wishlist_item(request, id):

    try:

        wishlist_item = Wishlist.objects.get(
            id=id,
            user=request.user
        )

    except Wishlist.DoesNotExist:

        return Response(
            {
                "error": "Wishlist item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    wishlist_item.delete()

    return Response(
        {
            "message": "Removed from wishlist"
        }
    )


# =========================================
# 🔢 WISHLIST COUNT
# =========================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def wishlist_count(request):

    count = Wishlist.objects.filter(
        user=request.user
    ).count()

    return Response({

        "wishlist_count": count
    })


# =========================================
# 🛒 MOVE TO CART
# =========================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def move_to_cart(request, id):

    try:

        wishlist_item = Wishlist.objects.get(
            id=id,
            user=request.user
        )

    except Wishlist.DoesNotExist:

        return Response(
            {
                "error": "Wishlist item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    cart_item, created = CartItem.objects.get_or_create(

        user=request.user,

        product=wishlist_item.product
    )

    if not created:

        cart_item.quantity += 1

        cart_item.save()

    wishlist_item.delete()

    return Response(
        {
            "message": "Moved to cart"
        }
    )