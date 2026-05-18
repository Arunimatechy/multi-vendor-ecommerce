from django.urls import path

from .views import (

    add_product,
    product_list,
    product_detail,
    vendor_products,
    edit_product,
    delete_product,
    featured_products,
    latest_products,
    category_products,
)

urlpatterns = [

    path(
        'add/',
        add_product
    ),

    path(
        '',
        product_list
    ),

    path(
        'featured/',
        featured_products
    ),

    path(
        'latest/',
        latest_products
    ),

    path(
        'category/<str:category>/',
        category_products
    ),

    path(
        'vendor/my-products/',
        vendor_products
    ),

    path(
        'edit/<int:id>/',
        edit_product
    ),

    path(
        'delete/<int:id>/',
        delete_product
    ),

    path('<int:id>/', product_detail),
]