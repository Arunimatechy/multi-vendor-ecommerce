from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    vendor_status = serializers.CharField(
        read_only=True
    )

    class Meta:
        model = OrderItem

        fields = [
            'id',
            'product',
            'product_name',
            'quantity',
            'price',
            'total_price',
            'vendor_status',   # ✅ IMPORTANT
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order

        fields = [
            'id',
            'customer',
            'full_name',
            'email',
            'phone',
            'address',
            'total_price',
            'status',
            'created_at',
            'items',
        ]



       
       
        