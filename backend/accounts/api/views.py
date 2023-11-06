import requests
from rest_framework.generics import CreateAPIView
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from django.contrib.auth import login, authenticate, logout

from .serializers import PasswordSerializer, UserSerializer, ProfileSerializer, LoginSerializer, \
    UserSocialLinksSerializer,UserCreateSerializer

from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action

from accounts.models import User, Profile, UserSocialLinks, UserLoginActivity
from django.middleware.csrf import get_token
from rest_framework.authtoken.models import Token

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):

    def get_serializer_class(self):
        action = self.action
        if action in ["list","retrieve","all"]:
            return UserSerializer
        elif action in ["set_password"]:
            return PasswordSerializer
        elif action in ['profile','update_profile']:
            return ProfileSerializer

        return super().get_serializer_class()

    def get_queryset(self):

        if self.request.user.is_superuser:

            return User.objects.all()

        else:

            return User.objects.filter(id=self.request.user.id)

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['POST'], detail=True, serializer_class=PasswordSerializer)
    def set_password(self, request, pk=None):

        user_object: User = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_object.set_password(serializer.validated_data['password'])

        user_object.save()

        return Response(status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=True)
    def profile(self, request, pk=None):
        user_object = self.get_object()
        user_profile = Profile.objects.get(user=user_object)

        serializer = ProfileSerializer(user_profile)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=True, serializer_class=ProfileSerializer)
    def update_profile(self, request, pk=None):
        user_object = self.get_object()

        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=False)
    def all(self, request, pk=None):

        """
        List all the users and this can ony be done by an admin user of a staff
        """

        if request.user.is_superuser:

            users = User.objects.all()

            serializer = UserSerializer(users, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        else:

            return Response({"detail": "You are not authorized to perform this action"},
                            status=status.HTTP_401_UNAUTHORIZED)


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
class UserProfileViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        
        if self.action in ["social_links"]:
            return UserSocialLinksSerializer

        return super().get_serializer_class()

    @action(methods=['GET', 'POST'], detail=True, serializer_class=UserSocialLinksSerializer)
    def social_links(self, request, pk=None):

        profile = self.get_object()

        if request.method == "GET":

            serializer = UserSocialLinksSerializer(profile.social_links.all(), many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "POST":

            serializer = UserSocialLinksSerializer(data=request.data)

            serializer.is_valid(raise_exception=True)

            serializer.save(profile=profile)

            return Response(serializer.data, status=status.HTTP_201_CREATED)


class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()


class LoginViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        print("Email : ", email, " password : ", password)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(username=email, password=password)

        print("User : ",user)

        if user is not None:
            login(request, user)

            token: str = ""

            token_obj, created = Token.objects.get_or_create(user=user)

            token = token_obj.key

            return Response({
                "data": {
                    "token": token,
                    "user": UserSerializer(user).data
                }
            }, status=status.HTTP_200_OK)


        else:

            return Response({"detail": "Email or Password incorrect!"}, status=status.HTTP_401_UNAUTHORIZED)


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
class UserSocialLinksViewSet(CreateModelMixin,
                             ListModelMixin,
                             RetrieveModelMixin,
                             UpdateModelMixin,
                             DestroyModelMixin,
                             GenericViewSet, ):
    queryset = UserSocialLinks.objects.all()
    serializer_class = UserSocialLinksSerializer


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
class LogoutView(APIView):
    queryset = []
    serializer_class = None

    def post(self, request, *args, **kwargs):
        logout(request)

        return Response(status=status.HTTP_204_NO_CONTENT)
