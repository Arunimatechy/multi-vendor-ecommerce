# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from .models import VendorStore
# from .serializers import VendorStoreSerializer
# from .permissions import IsVendor

# from rest_framework.permissions import IsAdminUser
# from rest_framework.response import Response

# from orders.models import Order, OrderItem


# # ================= CREATE STORE =================
# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsVendor])
# def create_store(request):

#     # check already exists
#     if VendorStore.objects.filter(vendor=request.user).exists():
#         return Response(
#             {"error": "Store already exists"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     serializer = VendorStoreSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save(vendor=request.user)
#         return Response({"message": "Store created successfully"})

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






# # ================= MY STORE (GET) =================
# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsVendor])
# def my_store(request):

#     try:
#         store = VendorStore.objects.get(vendor=request.user)
#     except VendorStore.DoesNotExist:
#         return Response(
#             {"error": "Store not found"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     serializer = VendorStoreSerializer(store)
#     return Response(serializer.data)


# # ================= UPDATE STORE (FIX FOR YOU) =================
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsVendor])
# def update_store(request):

#     try:
#         store = VendorStore.objects.get(vendor=request.user)
#     except VendorStore.DoesNotExist:
#         return Response(
#             {"error": "Store not found"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     serializer = VendorStoreSerializer(
#         store,
#         data=request.data,
#         partial=True
#     )

#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Store updated successfully"})

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import VendorStore
from .serializers import VendorStoreSerializer
from .permissions import IsVendor

from orders.models import Order, OrderItem


# ================= CREATE STORE =================
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsVendor])
def create_store(request):

    if VendorStore.objects.filter(vendor=request.user).exists():
        return Response(
            {"error": "Store already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = VendorStoreSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(vendor=request.user)
        return Response({"message": "Store created successfully"})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= DELETE ALL ORDERS (ADMIN ONLY) =================
@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_all_orders(request):

    OrderItem.objects.all().delete()
    Order.objects.all().delete()

    return Response({
        "message": "All orders deleted successfully"
    })


# ================= MY STORE (GET) =================
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsVendor])
def my_store(request):

    try:
        store = VendorStore.objects.get(vendor=request.user)
    except VendorStore.DoesNotExist:
        return Response(
            {"error": "Store not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = VendorStoreSerializer(store)
    return Response(serializer.data)


# ================= UPDATE STORE =================
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsVendor])
def update_store(request):

    try:
        store = VendorStore.objects.get(vendor=request.user)
    except VendorStore.DoesNotExist:
        return Response(
            {"error": "Store not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = VendorStoreSerializer(
        store,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Store updated successfully"})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)