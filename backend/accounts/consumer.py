import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from django.contrib.auth import get_user_model

from datetime import datetime

User = get_user_model()


@database_sync_to_async
def update_user_status(user_id: int, online: bool):
    # Implement logic to update user status in the database
    # You can use database_sync_to_async for database operations

    try:
        user = User.objects.get(id=user_id)
        if user:
            user.is_online = online
            if not online:
                user.last_login = datetime.now()
            user.save()
    except User.DoesNotExist:
        pass


class OnlineStatusConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user = self.scope['user']

        if not user.is_authenticated:
            await self.close()
            return

        print("User : ", user, " connected ")

        await self.user_online()

        await self.accept()

    async def disconnect(self, close_code):
        user = self.scope['user']

        if user.is_authenticated:

            print("User : ", user, " disconnected ")

            await self.user_offline()

        await self.close()

    async def user_online(self):
        await update_user_status(self.scope['user'].id, True)

    async def user_offline(self):
        await update_user_status(self.scope['user'].id, False)
