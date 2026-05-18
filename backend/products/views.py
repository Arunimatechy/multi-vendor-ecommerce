from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer
from vendors.models import VendorStore
from vendors.permissions import IsVendor


# ================= ADD PRODUCT =================

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsVendor])
def add_product(request):

    vendor_store = get_object_or_404(VendorStore, vendor=request.user)

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(vendor=vendor_store)

        return Response(
            {"message": "Product added successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= PRODUCT LIST (PUBLIC + FILTERS) =================
# ================= PRODUCT LIST (PUBLIC + FILTERS) =================

@api_view(['GET'])
@permission_classes([AllowAny])
def product_list(request):

    products = Product.objects.all().order_by('-created_at')

    # SEARCH
    search = request.GET.get('search')

    if search:
        products = products.filter(
            name__icontains=search
        )

    # CATEGORY
    category = request.GET.get('category')

    if category:
        products = products.filter(
            category=category
        )

    # FEATURED
    featured = request.GET.get('featured')

    if featured:
        products = products.filter(
            featured=True
        )

    # PRICE FILTER
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')

    if min_price and max_price:

        products = products.filter(
            price__gte=min_price,
            price__lte=max_price
        )

    # ✅ SORT
    sort = request.GET.get('sort')

    if sort == "low":

        products = products.order_by('price')

    elif sort == "high":

        products = products.order_by('-price')

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

# ================= PRODUCT DETAIL =================

@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, id):

    product = get_object_or_404(Product, id=id)

    serializer = ProductSerializer(product)
    return Response(serializer.data)


# ================= VENDOR PRODUCTS (STRICT FILTER) =================

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsVendor])
def vendor_products(request):

    vendor_store = get_object_or_404(VendorStore, vendor=request.user)

    products = Product.objects.filter(
        vendor=vendor_store
    ).order_by('-created_at')

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ================= EDIT PRODUCT =================

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsVendor])
def edit_product(request, id):

    vendor_store = get_object_or_404(VendorStore, vendor=request.user)

    product = get_object_or_404(Product, id=id, vendor=vendor_store)

    serializer = ProductSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Product updated"})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================= DELETE PRODUCT =================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsVendor])
def delete_product(request, id):

    vendor_store = get_object_or_404(VendorStore, vendor=request.user)

    product = get_object_or_404(Product, id=id, vendor=vendor_store)

    product.delete()

    return Response({"message": "Product deleted"})


# ================= FEATURED PRODUCTS =================

@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products(request):

    products = Product.objects.filter(featured=True).order_by('-created_at')

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ================= LATEST PRODUCTS =================

@api_view(['GET'])
@permission_classes([AllowAny])
def latest_products(request):

    products = Product.objects.all().order_by('-created_at')[:10]

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ================= CATEGORY PRODUCTS =================

@api_view(['GET'])
@permission_classes([AllowAny])
def category_products(request, category):

    products = Product.objects.filter(category=category)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)