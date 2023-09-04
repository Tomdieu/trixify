from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
# Create your models here.


class User(AbstractUser):

    phone_number = PhoneNumberField(_("Phone number"), blank=True, null=True, unique=True)
    email = models.EmailField(_("email address"),unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.birth_date}"
