from django.urls import path,include

app_name = 'contacts'

urlpatterns = [
    path('contacts/', include('contact.api.urls')),
]