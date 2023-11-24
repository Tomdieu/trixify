from django.dispatch import receiver, Signal
from django.db.models.signals import post_save

from .models import Conversation, Group, Message
from .types import NEW_MESSAGE

from .signal import user_added_to_conversation,user_added_to_group_conversation


@receiver(post_save, sender=Conversation)
def set_conversation_chat_to_false(sender, created, instance: Conversation, **kwargs):
    if created:
        instance.is_group = False
        instance.save()


@receiver(post_save, sender=Group)
def set_group_conversation_chat_to_false(sender, created, instance: Group, **kwargs):
    if created:
        instance.is_group = True
        instance.save()


@receiver(post_save, sender=Message)
def notify_chat(sender, created, instance: Message, **kwargs):
    from channels.layers import get_channel_layer
    import asyncio
    from .api.serializers import MessageSerializer


    if created: 
        channel_layer = get_channel_layer()
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        serializer = MessageSerializer(instance)
        loop.run_until_complete(channel_layer.group_send(
            f"chat_{instance.id}",
            {
                "type": "chat_message",
                "message": {"type": NEW_MESSAGE, "data": serializer.data}
            },
        ))
        loop.close()


@receiver(user_added_to_conversation)
def handle_user_added_to_conversation(sender, user, conversation, **kwargs):
    # conversation.add_conversation_member(user)
    pass


@receiver(user_added_to_group_conversation)
def handle_user_added_to_group_conversation(sender, user, group_conversation, **kwargs):
    # group_conversation.add_group_member(user)

    # Here we are going to notify the group that a new member has been added

    pass
