from django.contrib import admin

from .models import Music, Playlist, Stream


# Register your models here.


@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'artist', 'album', 'year', 'track_number']


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'owner']


@admin.register(Stream)
class StreamAdmin(admin.ModelAdmin):
    list_display = ['id', 'music', 'user', 'duration']
