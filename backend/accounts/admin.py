from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as _UserAdmin
from .models import Profile, UserSocialLinks,UserLoginActivity,UserSessions

from django.contrib.auth import get_user_model

# from nested_admin.nested import NestedStackedInline, NestedModelAdmin

User = get_user_model()

# Register your models here.


class UserSocialLinksInline(admin.StackedInline):
    model = UserSocialLinks
    extra = 0


class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 1
    inlines = [UserSocialLinksInline]


@admin.register(
    User
)  # register the model with this decorator so that it can be seen in Django Admin Panel
class UserAdmin(_UserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {"fields": ("username", "phone_number", "first_name", "last_name","avatar","is_online","last_online")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "phone_number",
                    "avatar",
                    "email",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    list_per_page = 25
    search_fields = ("username", "first_name", "last_name", "email", "phone_number")
    list_display = ("username", "email", "first_name", "last_name", "is_staff","is_online","last_online")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")

    readonly_fields = ['last_online']

    inlines = [ProfileInline]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "bio")
    inlines = [UserSocialLinksInline]
    list_per_page = 25


@admin.register(UserSocialLinks)
class UserSocialLinksAdmin(admin.ModelAdmin):
    list_per_page = 25
    list_display = ['id','label','url']

@admin.register(UserLoginActivity)
class UserLoginActivityAdmin(admin.ModelAdmin):
    pass

@admin.register(UserSessions)
class UserSessionsAdmin(admin.ModelAdmin):
    pass