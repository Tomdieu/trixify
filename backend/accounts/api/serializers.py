from accounts.models import User, Profile, UserSocialLinks

from rest_framework import serializers


class UserSocialLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialLinks
        fields = ('id', 'label', 'url')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id","user", "bio", "avatar", "birth_date", "created_at", "updated_at")

    def get_social_links(self, obj: Profile):
        social_links = UserSocialLinks.objects.filter(profile=obj)
        return UserSocialLinksSerializer(social_links, many=True).data

class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "email","first_name","last_name", "phone_number", "password")
        extra_kwargs = {"password": {"write_only": True},"is_online":{"read_only":True}}

    def get_profile(self, obj: User):
        if obj.profile:
            profile = obj.profile
            return ProfileSerializer(profile).data
        return {}

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "username", "email","first_name","last_name", "phone_number","is_online", "profile")
        
    def get_profile(self, obj: User):
        if obj.profile:
            profile = obj.profile
            return ProfileSerializer(profile).data
        return {}

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)


class PasswordSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ('password',)
