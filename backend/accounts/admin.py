from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as _UserAdmin
from .models import User,Profile

# Register your models here.

class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 1

@admin.register(User)  # register the model with this decorator so that it can be seen in Django Admin Panel
class UserAdmin(_UserAdmin):

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (('Personal info'), {'fields': ('username','phone_number','first_name', 'last_name')}),
        (('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    inlines = [ProfileInline]

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = ('user','bio')