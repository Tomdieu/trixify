from accounts.models import User, Profile, UserSocialLinks

from rest_framework import serializers


class UserSocialLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialLinks
        fields = ('id', 'label', 'url')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id","user", "bio", "birth_date")

    def get_social_links(self, obj: Profile):
        social_links = UserSocialLinks.objects.filter(profile=obj)
        return UserSocialLinksSerializer(social_links, many=True).data
    
class ProfileMinimalSerializer(serializers.ModelSerializer):
    social_links = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ("bio", "birth_date","social_links")

    def get_social_links(self, obj: Profile):
        social_links = UserSocialLinks.objects.filter(profile=obj)
        return UserSocialLinksSerializer(social_links, many=True).data

class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "email","first_name","last_name","avatar", "phone_number", "password")
        extra_kwargs = {"password": {"write_only": True},"is_online":{"read_only":True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User.objects.create(**validated_data)

        user.set_password(password)

        user.save()
        
        return user


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "username", "email","first_name","last_name", "phone_number","avatar","is_online", "profile","date_joined")
        
    def get_profile(self, obj: User):
        if obj.profile:
            profile = obj.profile
            return ProfileMinimalSerializer(profile).data
        return {}

class UserMinimalSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username","phone_number","avatar","is_online")

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)


class PasswordSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ('password',)

class UpdatePasswordSerializer(serializers.ModelSerializer):

    old_password = serializers.CharField(required=True, max_length=255)
    new_password = serializers.CharField(required=True, max_length=255)
    confirm_new_password = serializers.CharField(required=True, max_length=255)

    class Meta:
            
        model = User
        fields = ('old_password','new_password','confirm_new_password')

    def validate_new_password(self, value):
        data = self.get_initial()
        old_password = data.get('old_password')
        new_password = value

        if old_password == new_password:
            raise serializers.ValidationError("New password must be different from old password.")

        return value

    def validate_confirm_new_password(self, value):
        data = self.get_initial()
        new_password = data.get('new_password')
        confirm_new_password = value

        if new_password != confirm_new_password:
            raise serializers.ValidationError("Passwords must match.")

        return value
    
    def validate_old_password(self, value):
        data = self.get_initial()
        old_password = value
        user = self.context['request'].user

        if not user.check_password(old_password):
            raise serializers.ValidationError("Old password is not correct.")

        return value
    
class UsernameExistsResponseSerializer(serializers.Serializer):
    detail = serializers.CharField(max_length=255)
    exists = serializers.BooleanField()