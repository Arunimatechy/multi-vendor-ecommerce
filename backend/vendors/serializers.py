from rest_framework import serializers
from .models import VendorStore


class VendorStoreSerializer(serializers.ModelSerializer):

    class Meta:

        model = VendorStore

        fields = '__all__'

        read_only_fields = ['vendor']