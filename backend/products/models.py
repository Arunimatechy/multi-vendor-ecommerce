from django.db import models

from vendors.models import VendorStore


class Product(models.Model):

    CATEGORY_CHOICES = (

        ('spices', 'Spices'),

        ('fashion', 'Fashion'),

        ('vegetables', 'Vegetables'),

        ('fruits', 'Fruits'),

        ('bakery', 'Bakery'),

       ('beauty', 'Beauty & Personal Care'),

        ('home', 'Home Essentials'),

        ('stationery', 'Stationery'),

        )

    vendor = models.ForeignKey(
        VendorStore,
        on_delete=models.CASCADE,
        related_name='products'
    )

    name = models.CharField(
        max_length=200
    )

    slug = models.SlugField(
        unique=True
    )

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    stock = models.PositiveIntegerField()

    image = models.ImageField(
        upload_to='products/'
    )

    featured = models.BooleanField(
        default=False
    )

    is_available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return self.name