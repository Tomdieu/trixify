# Generated by Django 4.1.13 on 2023-11-18 18:13

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("chats", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="message",
            name="file",
        ),
        migrations.AddField(
            model_name="storyreplymessage",
            name="file",
            field=models.FileField(
                default=django.utils.timezone.now, upload_to="message_file/"
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="storyreplymessage",
            name="text",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="filemessage",
            name="file",
            field=models.FileField(upload_to="message_file/"),
        ),
        migrations.DeleteModel(
            name="LinkMessage",
        ),
    ]