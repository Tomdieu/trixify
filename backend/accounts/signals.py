from django.contrib.auth.signals import user_logged_out, user_login_failed, user_logged_in

from datetime import datetime

from django.dispatch import receiver
from django.db.models.signals import post_save

from django.contrib.auth import get_user_model

from .models import Profile, UserLoginActivity
from rest_framework.authtoken.models import Token

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:

        if not Token.objects.filter(user=instance).exists():
            Token.objects.create(user=instance)

        if not Profile.objects.filter(user=instance).exists():
            Profile.objects.create(user=instance)


@receiver([user_logged_in])
def set_user_online(sender, user, request, **kwargs):
    print("User : ", user, " logged in")
    user.is_online = True
    user.save()

    print(dir(request))

    UserLoginActivity.objects.create(user=user)


@receiver([user_logged_out, user_login_failed])
def update_user_online_status(sender, request, **kwargs):
    if kwargs.get('user', None):
        user = kwargs['user']
        user.is_online = False
        user.last_online = datetime.now()
        user.save()
