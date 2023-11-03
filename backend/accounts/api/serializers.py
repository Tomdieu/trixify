from accounts.models import User, Profile

from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id", "bio", "avatar", "birth_date", "created_at", "updated_at")


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "username", "email", "phone_number", "profile")

    def get_profile(self, obj):
        if obj.profile:
            profile = obj.profile
            return ProfileSerializer(profile).data
        return {}
