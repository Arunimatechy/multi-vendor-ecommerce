


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from .serializers import OrderSerializer

from vendors.models import VendorStore
from vendors.permissions import IsVendor

from cart.models import CartItem
from products.models import Product


# =========================================
# 🛒 PLACE ORDER (FIXED FULL VERSION)
# =========================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):

    items = request.data.get('items', [])

    if not items:
        return Response(
            {"error": "Cart is empty"},
            status=status.HTTP_400_BAD_REQUEST
        )

    address = request.data.get('address', {})
    total_price = request.data.get('total', 0)

    # ================= CREATE ORDER =================
    order = Order.objects.create(
        customer=request.user,
        full_name=(address.get('full_name') or "")[:200],
        phone=(address.get('phone') or "")[:20],
        email=request.user.email,
        address=f"{address.get('address_line','')}, {address.get('city','')} - {address.get('pincode','')}",
        total_price=total_price
    )

    created_items = 0

    # ================= CREATE ORDER ITEMS =================
    for item in items:

        product_id = item.get('product') or item.get('product_id')

        # ❌ skip invalid product id
        try:
            product_id = int(product_id)
        except (TypeError, ValueError):
            continue

        quantity = item.get('quantity', 1)

        if quantity <= 0:
            continue

        # ✅ safe fetch
        product = Product.objects.filter(id=product_id).first()

        if not product:
            continue

        price = product.discount_price or product.price

        vendor = getattr(product, 'vendor', None)

        if not vendor:
            continue

        OrderItem.objects.create(
            order=order,
            product=product,
            vendor=vendor,
            quantity=quantity,
            price=price,
            total_price=price * quantity
        )

        created_items += 1

    # ❌ if nothing valid
    if created_items == 0:
        order.delete()
        return Response(
            {"error": "No valid products found"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ================= CLEAR CART =================
    CartItem.objects.filter(user=request.user).delete()

    return Response(
        {
            "message": "Order placed successfully",
            "id": order.id
        },
        status=status.HTTP_201_CREATED
    )


# =========================================
# 📦 MY ORDERS
# =========================================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):

    orders = Order.objects.filter(
        customer=request.user
    ).prefetch_related(
        'items',
        'items__product',
        'items__vendor'
    ).order_by('-created_at')

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# =========================================
# 📄 ORDER DETAIL
# =========================================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, id):

    order = Order.objects.filter(
        id=id,
        customer=request.user
    ).prefetch_related(
        'items',
        'items__product',
        'items__vendor'
    ).first()

    if not order:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = OrderSerializer(order)
    return Response(serializer.data)


# =========================================
# ❌ CANCEL ORDER
# =========================================
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cancel_order(request, id):

    order = Order.objects.filter(
        id=id,
        customer=request.user
    ).first()

    if not order:
        return Response({"error": "Order not found"}, status=404)

    if order.status == "delivered":
        return Response({"error": "Delivered order cannot be cancelled"}, status=400)

    if order.status == "cancelled":
        return Response({"error": "Order already cancelled"}, status=400)

    order.status = "cancelled"
    order.save()

    order.items.update(vendor_status="cancelled")

    return Response({
        "message": "Order cancelled successfully",
        "status": order.status
    })


# =========================================
# 🏪 VENDOR ORDERS
# =========================================
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsVendor])
def vendor_orders(request):

    vendor_store = VendorStore.objects.filter(
        vendor=request.user
    ).first()

    if not vendor_store:
        return Response({"error": "Vendor store not found"}, status=404)

    order_items = OrderItem.objects.filter(
        vendor=vendor_store
    ).select_related('order', 'product', 'vendor').order_by('-id')

    data = []

    for item in order_items:
        data.append({
            "order_item_id": item.id,
            "order_id": item.order.id,
            "product": item.product.name,
            "quantity": item.quantity,
            "price": item.price,
            "total_price": item.total_price,
            "customer": item.order.customer.username,
            "customer_name": item.order.full_name,
            "customer_phone": item.order.phone,
            "address": item.order.address,
            "status": item.vendor_status,
            "created_at": item.order.created_at
        })

    return Response(data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsVendor])
def update_vendor_item_status(request, id):

    status_value = request.data.get('status')

    if not status_value:
        return Response(
            {"error": "Status required"},
            status=400
        )

    vendor_store = VendorStore.objects.filter(
        vendor=request.user
    ).first()

    try:

        item = OrderItem.objects.get(
            id=id,
            vendor=vendor_store
        )

    except OrderItem.DoesNotExist:

        return Response(
            {"error": "Order item not found"},
            status=404
        )

    # ✅ UPDATE ITEM STATUS
    item.vendor_status = status_value
    item.save()

    # ✅ SMART ORDER STATUS
    order = item.order

    all_items = order.items.all()

    if all(
        i.vendor_status == "delivered"
        for i in all_items
    ):
        order.status = "delivered"

    elif all(
        i.vendor_status == "cancelled"
        for i in all_items
    ):
        order.status = "cancelled"

    else:
        order.status = "processing"

    order.save()

    return Response({
        "message": "Vendor item status updated",
        "status": item.vendor_status
    })


# =========================================
# ❌ DELETE ORDER
# =========================================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, id):

    order = Order.objects.filter(
        id=id,
        customer=request.user
    ).first()

    if not order:
        return Response({"error": "Order not found"}, status=404)

    order.delete()

    return Response({"message": "Order deleted successfully"})