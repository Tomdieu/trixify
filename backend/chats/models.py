from django.db import models

from django.contrib.auth import get_user_model

from polymorphic.models import PolymorphicModel

from django.utils.translation import gettext_lazy as _

# Create your models here.

User = get_user_model()


class Conversation(PolymorphicModel):
    """Conversation model"""
    is_group = models.BooleanField(default=False)
    
    users = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class GroupConversation(Conversation):
    name = models.CharField(max_length=100)
    group_icon = models.ImageField(upload_to='group_icons/', null=True, blank=True)
    description = models.TextField(null=True,blanck=True)


class GroupMember(models.Model):
    user = models.ForeignKey(User, related_name='group_members', on_delete=models.CASCADE)
    group = models.ForeignKey(GroupConversation, related_name='group_members', on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, related_name='created_conversations', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    joined_on = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('user', 'group'),)

    def __str__(self) -> str:
        return f'{self.user} - {self.group}'

class Message(models.Model):
    """Message Model"""
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    file = models.FileField(upload_to='files/', null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.sender} - {self.conversation} - {self.content}'

class Seen(models.Model):
    """Seen Model"""
    message = models.ForeignKey(Message, related_name='seen', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='seen', on_delete=models.CASCADE)
    seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.user} - {self.message} - {self.seen}'