from rest_framework import serializers

from .models import CartItem


class CartItemSerializer(serializers.ModelSerializer):

    total = serializers.SerializerMethodField()

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    product_image = serializers.ImageField(
        source='product.image',
        read_only=True
    )

    class Meta:

        model = CartItem

        fields = [

            'id',
            'product',
            'product_name',
            'product_image',
            'quantity',
            'total',
        ]

    def get_total(self, obj):

        return obj.total_price()