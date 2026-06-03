# from rest_framework import serializers
# from .models import Product


# # =========================
# # PRODUCT LIST SERIALIZER
# # =========================

# class ProductListSerializer(serializers.ModelSerializer):

#     image = serializers.CharField(
#         source='image.url',
#         read_only=True
#     )

#     class Meta:

#         model = Product

#         fields = [

#             'id',
#             'name',
#             'slug',
#             'category',
#             'price',
#             'discount_price',
#             'stock',
#             'featured',
#             'image',

#         ]


# # =========================
# # PRODUCT DETAIL SERIALIZER
# # =========================

# class ProductDetailSerializer(serializers.ModelSerializer):

#     image = serializers.CharField(
#         source='image.url',
#         read_only=True
#     )

#     class Meta:

#         model = Product

#         fields = [

#             'id',
#             'vendor',
#             'name',
#             'slug',
#             'category',
#             'description',
#             'price',
#             'discount_price',
#             'stock',
#             'image',
#             'featured',
#             'is_available',
#             'created_at',
#             'updated_at',

#         ]

#         read_only_fields = ['vendor']
from rest_framework import serializers
from .models import Product


# =========================
# PRODUCT LIST SERIALIZER
# =========================

class ProductListSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:

        model = Product

        fields = [

            'id',
            'name',
            'slug',
            'category',
            'price',
            'discount_price',
            'stock',
            'featured',
            'image',

        ]

    def get_image(self, obj):

        if obj.image:
            return obj.image.url.replace("http://", "https://")

        return None


# =========================
# PRODUCT DETAIL SERIALIZER
# =========================

class ProductDetailSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:

        model = Product

        fields = [

            'id',
            'vendor',
            'name',
            'slug',
            'category',
            'description',
            'price',
            'discount_price',
            'stock',
            'image',
            'featured',
            'is_available',
            'created_at',
            'updated_at',

        ]

        read_only_fields = ['vendor']

    def get_image(self, obj):

        if obj.image:
            return obj.image.url.replace("http://", "https://")

        return None