# Generated by Django 4.1.13 on 2023-11-06 18:54

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("chats", "0001_initial"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="conversationuser",
            unique_together={("user", "conversation")},
        ),
    ]
