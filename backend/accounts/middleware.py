from channels.middleware import BaseMiddleware
from django.utils import timezone
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from urllib.parse import parse_qs

from channels.auth import UserLazyObject

# from django.utils.deprecation import MiddlewareMixin
# from social_core.backends.base import BaseAuth


class UpdateUserOnlineMiddleware:
    """
    Middleware for UpdateUser online
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            request.user.last_online = timezone.now()
            request.user.is_online = True
            request.user.save()

        response = self.get_response(request)
        return response


@database_sync_to_async
def get_user_from_token(token: str):
    try:
        return Token.objects.get(key=token).user

    except Exception as e:
        print("Error : ", e)
        
        return AnonymousUser()


class TokenAuthMiddleware(BaseMiddleware):

    def populate_scope(scope):
        if "user" not in scope:
            scope['user'] = UserLazyObject()

    async def resolve_scope(self, scope):
        token = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
        scope["user"]._wrapped = await get_user_from_token(token)

    async def __call__(self, scope, recieve, send):
        scope = dict(scope)

        # Scope injection/mutation per this middleware's needs.
        self.populate_scope(scope)
        # Grab the finalized/resolved scope
        await self.resolve_scope(scope)

        return await super().__call__(scope, recieve, send)
