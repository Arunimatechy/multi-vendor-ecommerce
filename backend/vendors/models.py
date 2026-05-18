from django.db import models
from users.models import User


class VendorStore(models.Model):

    vendor = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    store_name = models.CharField(
        max_length=200
    )

    logo = models.ImageField(
        upload_to='store_logos/'
    )

    banner = models.ImageField(
        upload_to='store_banners/'
    )

    description = models.TextField()

    address = models.CharField(
        max_length=300
    )

    approved = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.store_name
