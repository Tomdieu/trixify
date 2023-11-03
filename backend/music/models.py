from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Music(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year = models.IntegerField()
    track_number = models.IntegerField()
    file = models.FileField(upload_to="music/")
    created_by = models.ForeignKey(User, related_name="created_music", on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.title} - {self.artist}"

class Playlist(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(
        User, related_name="created_playlists", on_delete=models.CASCADE
    )
    musics = models.ManyToManyField(Music, related_name="playlists")


    def __str__(self):
        return f"{self.name}"

