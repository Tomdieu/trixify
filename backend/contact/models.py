from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Contact(models.Model):
    user = models.ForeignKey(User, related_name='contacts', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.phone_number}"
