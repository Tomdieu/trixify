from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Conversation,GroupConversation

@receiver(post_save,sender=Conversation)
def set_conversation_chat_to_false(sender,created,instance:Conversation, **kwargs):
    if created:

        instance.is_group = False
        instance.save()

@receiver(post_save,sender=GroupConversation)
def set_group_conversation_chat_to_false(sender,created,instance:GroupConversation, **kwargs):
    if created:

        instance.is_group = True
        instance.save()
