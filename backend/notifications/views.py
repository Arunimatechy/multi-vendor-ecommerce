from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer


# =========================================
# 🔔 MY NOTIFICATIONS
# =========================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def my_notifications(request):

    notifications = Notification.objects.filter(
        user=request.user
    ).order_by('-created_at')

    serializer = NotificationSerializer(
        notifications,
        many=True
    )

    return Response(serializer.data)


# =========================================
# ✅ MARK AS READ
# =========================================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])

def mark_as_read(request, id):

    try:

        notification = Notification.objects.get(
            id=id,
            user=request.user
        )

    except Notification.DoesNotExist:

        return Response(
            {
                "error": "Notification not found"
            }
        )

    notification.is_read = True

    notification.save()

    return Response(
        {
            "message": "Notification marked as read"
        }
    )


# =========================================
# 🔴 UNREAD COUNT
# =========================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])

def unread_notifications_count(request):

    count = Notification.objects.filter(

        user=request.user,

        is_read=False

    ).count()

    return Response({

        "unread_count": count
    })


# =========================================
# ❌ DELETE NOTIFICATION
# =========================================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])

def delete_notification(request, id):

    try:

        notification = Notification.objects.get(
            id=id,
            user=request.user
        )

    except Notification.DoesNotExist:

        return Response(
            {
                "error": "Notification not found"
            }
        )

    notification.delete()

    return Response(
        {
            "message": "Notification deleted"
        }
    )