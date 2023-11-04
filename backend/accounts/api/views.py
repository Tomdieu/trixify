import json
from datetime import datetime

import requests
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from oauth2_provider.models import AccessToken, Application, RefreshToken
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
from rest_framework.generics import CreateAPIView

from django.contrib.auth import login, authenticate

from .serializers import UserSerializer, ProfileSerializer, LoginSerializer, UserSocialLinksSerializer, \
    TokenRefreshSerializer

from rest_framework.permissions import IsAuthenticated

from accounts.models import User, Profile, UserSocialLinks, UserLoginActivity
from django.middleware.csrf import get_token


# from

class UserViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [TokenHasReadWriteScope]
    # permission_classes = [IsAuthenticated, TokenHasReadWriteScope]


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
    # permission_classes = [IsAuthenticated]


class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
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

        print("User : ", user)

        token: str = ""

        if user is not None:

            login(request, user)
            UserLoginActivity.objects.create(user=user)

            time_threshold = datetime.now()
            token_obj = AccessToken.objects.filter(user=user, expires=time_threshold)
            if token_obj:
                token_obj = token_obj[0]
                token = token_obj.token

            else:
                if not Application.objects.filter(user=1).exists():
                    Application.objects.create(user_id=1, authorization_grant_type="password",
                                               client_type="confidential")
                app_obj = Application.objects.filter(user=1)
                if app_obj:
                    app_obj = app_obj[0]
                    client_id = app_obj.client_id
                    client_secret = app_obj.client_secret
                    csrf_token = get_token(request)
                    url = 'http://' + request.get_host() + "/0/token/"
                    data_dict = {"grant_type": "password",
                                 "email": email, "password": password,
                                 "client_id": client_id, "client_secret": client_secret,
                                 'csrfmiddlewaretoken': csrf_token,
                                 "csrftoken":csrf_token
                                 }
                    # print(dir(request))
                    print("CSRF TOKEN : ", csrf_token)
                    response = requests.post(url, data_dict)
                    print("Response ", response.text)
                    # data = json.loads(response.text)

                    # token = data.get('access_token', '')

            request.session['token'] = token

            return Response(
                {
                    "data": "",
                    "token": token,
                    "success": True,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "success": False,
                "message": "Invalid credentials username or password incorrect",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserSocialLinksViewSet(CreateModelMixin,
                             ListModelMixin,
                             RetrieveModelMixin,
                             UpdateModelMixin,
                             DestroyModelMixin,
                             GenericViewSet, ):
    queryset = UserSocialLinks.objects.all()
    serializer_class = UserSocialLinksSerializer


class TokenRefreshView(CreateAPIView, GenericViewSet):
    serializer_class = TokenRefreshSerializer

    queryset = []

    def create(self, request):
        data = request.data
        user_id = data['user_id']
        client_id = data['client_id']
        client_secret = data['client_secret']

        token_obj = RefreshToken.objects.filter(user_id=user_id).order_by('-id')
        refresh_token = ""

        if token_obj:
            token_obj = token_obj[0]
            refresh_token = token_obj.token

        url = "http://" + request.get_host() + "/o/token/"
        data_dict = {
            "grant_type": "refresh_token", "client_id": client_id, "client_secret": client_secret,
            "refresh_token": refresh_token
        }

        response = requests.post(url, data=data_dict)
        data = response.json()

        return Response(data, status=status.HTTP_201_CREATED)
