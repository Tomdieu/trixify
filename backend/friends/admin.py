from django.contrib import admin

from .models import Friend, FriendRequest


# Register your models here.

@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = ['user', 'friend']


@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_user', 'is_active']
