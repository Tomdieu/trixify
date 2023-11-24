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

from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication

from .serializers import (
    PasswordSerializer,
    UserSerializer,
    ProfileSerializer,
    LoginSerializer,
    UserSocialLinksSerializer,
    UserCreateSerializer,
    UpdatePasswordSerializer,
    UsernameExistsResponseSerializer,
)

from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action,api_view

from accounts.models import User, Profile, UserSocialLinks, UserLoginActivity
from django.middleware.csrf import get_token
from rest_framework.authtoken.models import Token

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import (
    TokenAuthentication,
    BasicAuthentication,
    SessionAuthentication,
)

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
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
        if action in ["create"]:
            return UserCreateSerializer
        if action in ["list", "retrieve", "all"]:
            return UserSerializer
        elif action in ["set_password"]:
            return PasswordSerializer
        elif action in ["profile", "update_profile"]:
            return ProfileSerializer
        elif action in ["update_password"]:
            return UpdatePasswordSerializer

        return super().get_serializer_class()

    def get_queryset(self):
        return User.objects.all()

    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    @action(methods=["GET"], detail=False)
    def me(self, request, pk=None):
        user_object = request.user

        serializer = UserSerializer(user_object)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["POST"], detail=True)
    def set_password(self, request, pk=None):
        user_object: User = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_object.set_password(serializer.validated_data["password"])

        user_object.save()

        return Response(status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=True)
    def profile(self, request, pk=None):
        user_object = self.get_object()
        user_profile = Profile.objects.get(user=user_object)

        serializer = ProfileSerializer(user_profile)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["POST"], detail=True)
    def update_profile(self, request, pk=None):
        # user_object = self.get_object()

        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["POST"], detail=True)
    def update_password(self, request, pk=None):
        user_object = self.get_object()

        serializer = UpdatePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_object.set_password(serializer.validated_data["new_password"])

        user_object.save()

        return Response(status=status.HTTP_200_OK)




class UsernameExistsAPIView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "username",
                openapi.IN_QUERY,
                description="Username to check availability",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: openapi.Response(
                "Username availability response", UsernameExistsResponseSerializer),
            400: openapi.Response("Bad request", UsernameExistsResponseSerializer),
        },
)
    def get(self, request, format=None):
        
        username = request.GET.get("username", None)
        user = User.objects.filter(username=username).first()
        if user:
            return Response(
                {"detail": "Username already exists!", "exists": True},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            return Response(
                {"detail": "Username is available!", "exists": False},
                status=status.HTTP_200_OK,
            )

class EmailExistsAPIView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Email to check availability",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        responses={
            200: openapi.Response(
                "Email availability response", UsernameExistsResponseSerializer),
            400: openapi.Response("Bad request", UsernameExistsResponseSerializer),
        },
)
    def get(self, request, format=None):
        
        email = request.GET.get("email", None)
        user = User.objects.filter(email=email).first()
        if user:
            return Response(
                {"detail": "Email already exists!", "exists": True},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            return Response(
                {"detail": "Email is available!", "exists": False},
                status=status.HTTP_200_OK,
            )
@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
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

    @action(
        methods=["GET", "POST"], detail=True, serializer_class=UserSocialLinksSerializer
    )
    def social_links(self, request, pk=None):
        profile = self.get_object()

        if request.method == "GET":
            serializer = UserSocialLinksSerializer(
                profile.social_links.all(), many=True
            )

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
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)

            token: str = ""

            token_obj, created = Token.objects.get_or_create(user=user)

            token = token_obj.key

            return Response(
                {"data": {"token": token, "user": UserSerializer(user,context={"request":request}).data}},
                status=status.HTTP_200_OK,
            )

        else:
            return Response(
                {"detail": "Email or Password incorrect!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class UserSocialLinksViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = UserSocialLinks.objects.all()
    serializer_class = UserSocialLinksSerializer


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class LogoutView(APIView):
    queryset = []
    serializer_class = None

    def post(self, request, *args, **kwargs):
        logout(request)

        return Response(status=status.HTTP_204_NO_CONTENT)
