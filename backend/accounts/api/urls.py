from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("users", views.UserViewSet, basename="users")
router.register("profile", views.UserProfileViewSet, basename="profile")
router.register("login", views.LoginViewSet, basename="login")
router.register("register", views.RegisterViewSet, basename="register")
router.register("user-links", views.UserSocialLinksViewSet, basename='user-links')

urlpatterns = [
    path("check_username/",views.UsernameExistsAPIView.as_view()),
    path("check_email/",views.EmailExistsAPIView.as_view()),
    path("logout/", views.LogoutView.as_view())
]

urlpatterns += router.urls
