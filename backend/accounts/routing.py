from django.urls import path

from .consumer import OnlineStatusConsumer

websocket_urlspatterns = [
    path('ws/online_status/',OnlineStatusConsumer.as_asgi())
]