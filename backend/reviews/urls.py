from django.urls import path

from .views import (
    add_review,
    product_reviews,
    edit_review,
    delete_review,
    product_average_rating,
    vendor_reviews,
    can_write_review
)

urlpatterns = [
    # ⭐ Add Review
    path('add/<int:product_id>/', add_review),

    # 📦 Product Reviews
    path('product/<int:product_id>/', product_reviews),

    # ✏️ Edit Review
    path('edit/<int:id>/', edit_review),

    # ❌ Delete Review
    path('delete/<int:id>/', delete_review),

    # 📊 Average Rating
    path('average/<int:product_id>/', product_average_rating),

    # 🏪 Vendor Reviews
    path('vendor/', vendor_reviews),

    # ⭐ CAN WRITE REVIEW CHECK
    path('can-review/<int:product_id>/', can_write_review),
]