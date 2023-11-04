from accounts.models import User, Profile, UserSocialLinks

from rest_framework import serializers


class UserSocialLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialLinks
        fields = ('id', 'label', 'url')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id", "bio", "avatar", "birth_date", "created_at", "updated_at")

    def get_social_links(self, obj: Profile):
        social_links = UserSocialLinks.objects.filter(profile=obj)
        return UserSocialLinksSerializer(social_links, many=True).data


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ("id", "username", "email", "phone_number", "profile", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def get_profile(self, obj: User):
        if obj.profile:
            profile = obj.profile
            return ProfileSerializer(profile).data
        return {}

    # def validate_confirm_password(self, obj):
    #     validated_data = self.validated_data['']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)


class TokenRefreshSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True, )
    client_id = serializers.CharField(required=True, )
    client_secret = serializers.CharField(required=True, )
