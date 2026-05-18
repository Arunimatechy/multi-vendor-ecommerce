from rest_framework import serializers
from .models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.CharField(source='product.price', read_only=True)
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = Wishlist
        fields = [
            'id',
            'product',
            'product_name',
            'product_image',
            'product_price',
            'created_at'
        ]

    def get_product_image(self, obj):
        image = getattr(obj.product, "image", None)
        return image.url if image else None