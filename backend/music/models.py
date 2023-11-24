from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Music(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100,blank=True,null=True)
    genre = models.CharField(max_length=100,blank=True,null=True)
    year = models.IntegerField()
    track_number = models.IntegerField(blank=True,null=True)
    file = models.FileField(upload_to="music/")
    owner = models.ForeignKey(User, related_name="created_music", on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.artist}"


class Playlist(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    owner = models.ForeignKey(
        User, related_name="playlists", on_delete=models.CASCADE
    )
    musics = models.ManyToManyField(Music, related_name="musics")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}"


class Stream(models.Model):
    music = models.ForeignKey(Music, on_delete=models.CASCADE, related_name='stream')
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='stream')
    duration = models.DurationField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} stream {self.music} for {self.duration} on {self.created_at.day}"
