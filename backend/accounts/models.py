from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class User(AbstractUser):
    phone_number = PhoneNumberField(
        _("Phone number"), max_length=30, blank=True, null=True, unique=True
    )
    email = models.EmailField(_("email address"), unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.user} - profile"


class UserSocialLinks(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="social_links", on_delete=models.CASCADE
    )
    url = models.URLField(_("social link"))
    label = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.profile}: {self.label} - {self.url}"


class UserLoginActivity(models.Model):
    user = models.ForeignKey(
        User, related_name="login_activities", on_delete=models.CASCADE
    )
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} : login at  {self.created_at} at position : [{self.lat},{self.lng}]"


class UserSessions(models.Model):
    user = models.ForeignKey(User, related_name="sessions", on_delete=models.CASCADE)
    user_agent = models.CharField(max_length=255, blank=True, null=True)
    browser = models.CharField(max_length=255, blank=True, null=True)
    ip_address = models.CharField(max_length=255, blank=True, null=True)
    os = models.CharField(max_length=255, blank=True, null=True)
    is_mobile = models.BooleanField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.browser} {self.os} session"
