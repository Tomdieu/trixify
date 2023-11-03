from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("users", views.UserViewSet, basename="users")
router.register("profile", views.UserProfileViewSet, basename="profile")

urlpatterns = []

urlpatterns += router.urls
