from rest_framework import serializers

from accounts.api.serializers import UserSerializer
from music.models import Music, Playlist


class MusicListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()

    class Meta:
        model = Music
        fields = '__all__'
class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = '__all__'


class PlaylistListSerializer(serializers.ModelSerializer):
    musics = MusicSerializer(many=True)

    class Meta:
        model = Playlist
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'
