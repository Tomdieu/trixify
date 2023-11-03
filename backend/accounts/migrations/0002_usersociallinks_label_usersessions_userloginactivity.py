# Generated by Django 4.2.4 on 2023-11-03 13:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="usersociallinks",
            name="label",
            field=models.CharField(default="", max_length=20),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="UserSessions",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("user_agent", models.CharField(blank=True, max_length=255, null=True)),
                ("browser", models.CharField(blank=True, max_length=255, null=True)),
                ("ip_address", models.CharField(blank=True, max_length=255, null=True)),
                ("os", models.CharField(blank=True, max_length=255, null=True)),
                ("is_mobile", models.BooleanField(blank=True, null=True)),
                ("created_at", models.DateField(auto_now_add=True)),
                ("updated_at", models.DateField(auto_now=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sessions",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserLoginActivity",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("lat", models.FloatField(blank=True, null=True)),
                ("lng", models.FloatField(blank=True, null=True)),
                ("created_at", models.DateField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="login_activities",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
