from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("users", views.UserViewSet, basename="users")
router.register("profile", views.UserProfileViewSet, basename="profile")
router.register("login", views.LoginViewSet, basename="login")
router.register("register", views.RegisterViewSet, basename="register")
router.register("user-links", views.UserSocialLinksViewSet, basename='user-links')
router.register('refresh-token',views.TokenRefreshView,basename='refresh-token')

urlpatterns = [
    # path("rtoken/", views.TokenRefreshView.as_view({'post': 'create'}))
]

urlpatterns += router.urls
