# from rest_framework import serializers
# from .models import Review


# class ReviewSerializer(serializers.ModelSerializer):

#     username = serializers.CharField(
#         source='user.username',
#         read_only=True
#     )

#     class Meta:
#         model = Review
#         fields = [
#             'id',
#             'username',
#             'product',
#             'rating',
#             'comment',
#             'created_at',
#             'updated_at'
#         ]

#         read_only_fields = ['user', 'product']

from rest_framework import serializersss

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    class Meta:
        model = Review

        fields = [
            'id',
            'username',
            'product',
            'rating',
            'comment',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'user',
            'product',
        ]