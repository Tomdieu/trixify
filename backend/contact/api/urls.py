from rest_framework.routers import DefaultRouter


from contact.api.view import CheckContactViewSet, ContactViewSet

router = DefaultRouter()

router.register('contacts', ContactViewSet, basename='contacts')

router.register('check-contacts', CheckContactViewSet, basename='check-contacts')



urlpatterns = []

urlpatterns += router.urls