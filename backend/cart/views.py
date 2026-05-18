
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import status

from .models import CartItem
from .serializers import CartItemSerializer

from products.models import Product


# ================= ADD TO CART =================

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def add_to_cart(request):

    product_id = request.data.get('product_id')

    quantity = int(
        request.data.get('quantity', 1)
    )

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

    cart_item, created = CartItem.objects.get_or_create(

        user=request.user,
        product=product
    )

    if not created:

        cart_item.quantity += quantity

    else:

        cart_item.quantity = quantity

    cart_item.save()

    return Response(
        {
            "message": "Product added to cart"
        }
    )


# ================= VIEW CART =================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def view_cart(request):

    cart_items = CartItem.objects.filter(
        user=request.user
    )

    serializer = CartItemSerializer(
        cart_items,
        many=True
    )

    total_cart_price = sum(

        item.total_price()
        for item in cart_items
    )

    return Response({

        "cart_items": serializer.data,

        "cart_total": total_cart_price
    })


# ================= UPDATE CART ITEM =================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])

def update_cart_item(request, id):

    try:

        cart_item = CartItem.objects.get(
            id=id,
            user=request.user
        )

    except CartItem.DoesNotExist:

        return Response(
            {
                "error": "Cart item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    quantity = request.data.get('quantity')

    if quantity:

        cart_item.quantity = int(quantity)

        cart_item.save()

    return Response(
        {
            "message": "Cart updated"
        }
    )


# ================= REMOVE CART ITEM =================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def remove_cart_item(request, id):

    try:

        cart_item = CartItem.objects.get(
            id=id,
            user=request.user
        )

    except CartItem.DoesNotExist:

        return Response(
            {
                "error": "Cart item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    cart_item.delete()

    return Response(
        {
            "message": "Item removed from cart"
        }
    )


# ================= CLEAR CART =================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def clear_cart(request):

    CartItem.objects.filter(
        user=request.user
    ).delete()

    return Response(
        {
            "message": "Cart cleared"
        }
    )