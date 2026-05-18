from django.urls import path

from .views import (

    add_to_wishlist,
    my_wishlist,
    remove_wishlist_item,
    wishlist_count,
    move_to_cart,
)

urlpatterns = [

    path(
        'add/<int:product_id>/',
        add_to_wishlist
    ),

    path(
        '',
        my_wishlist
    ),

    path(
        'remove/<int:id>/',
        remove_wishlist_item
    ),

    path(
        'count/',
        wishlist_count
    ),

    path(
        'move-to-cart/<int:id>/',
        move_to_cart
    ),
]