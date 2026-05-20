
from django.db import models
from vendors.models import VendorStore
from cloudinary.models import CloudinaryField


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
        related_name='products',
        db_index=True
    )

    name = models.CharField(
        max_length=200,
        db_index=True
    )

    slug = models.SlugField(
        unique=True,
        db_index=True
    )

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        db_index=True
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        db_index=True
    )

    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    stock = models.PositiveIntegerField(
        db_index=True
    )

    # ✅ CLOUDINARY
    image = CloudinaryField(
        'image',
        folder='products'
    )

    featured = models.BooleanField(
        default=False,
        db_index=True
    )

    is_available = models.BooleanField(
        default=True,
        db_index=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = ['-created_at']

        indexes = [

            models.Index(fields=['name']),
            models.Index(fields=['category']),
            models.Index(fields=['price']),
            models.Index(fields=['created_at']),
            models.Index(fields=['is_available']),
            models.Index(fields=['featured']),

            # ✅ BEST FOR SEARCH + FILTER
            models.Index(
                fields=['category', 'price']
            ),

        ]

    def __str__(self):

        return self.name