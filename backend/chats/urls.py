from django.urls import path,include

app_name = "chats"

urlpatterns = [
    path('chats/',include('chats.api.urls'))
]