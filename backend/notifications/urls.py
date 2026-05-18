from django.urls import path

from .views import (

    my_notifications,
    mark_as_read,
    unread_notifications_count,
    delete_notification,
)

urlpatterns = [

    path(
        '',
        my_notifications
    ),

    path(
        'mark-read/<int:id>/',
        mark_as_read
    ),

    path(
        'unread-count/',
        unread_notifications_count
    ),

    path(
        'delete/<int:id>/',
        delete_notification
    ),
]