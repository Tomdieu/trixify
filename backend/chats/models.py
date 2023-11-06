from collections.abc import Iterable
from django.db import models

from django.contrib.auth import get_user_model
from django.db.utils import DEFAULT_DB_ALIAS

from polymorphic.models import PolymorphicModel

from django.utils.translation import gettext_lazy as _

from django.core.exceptions import ValidationError

from story.models import Story
from django.utils.translation import gettext_lazy as _

# Create your models here.

User = get_user_model()


class Chat(PolymorphicModel):
    """Chat Base Model"""

    is_group = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Conversation(Chat):
    """Conversation model"""

    users = models.ManyToManyField(User, through="ConversationUser", related_name="participants")

    def __str__(self):
        users = []
        for user in self.users.all():
            users.append(user)
        print(users)
        return f"Conversation : {self.id}"


class ConversationUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="conversations")
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="participants")

    def __str__(self) -> str:
        return f"User : {self.user} Conversation : {self.conversation}"

    class Meta:
        unique_together = (("user", "conversation"),)

    def clean(self) -> None:
        super().clean()

        # Check if they are more than two users in a particular conversation

        # conversation_users = ConversationUser.objects.filter(conversation = self.conversation)

        # if len(conversation_users) >= 2 :
        #     raise ValidationError({"user":"Conversation full"})

        # Check if a user is to be added two times in a same conversation

        user_double = ConversationUser.objects.filter(conversation=self.conversation, user=self.user)

        if user_double.exists():
            raise ValidationError({"user": "User already present in conversation"})

        # Check if the user we want to create a conversation is not found in another
        # conversation with the user to be inserted in the current conversation


class GroupConversation(Chat):
    """Group Conversation model"""

    name = models.CharField(max_length=100)
    group_icon = models.ImageField(upload_to="group_icons/", null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(
        User, related_name="created_conversations", on_delete=models.CASCADE
    )
    users = models.ManyToManyField(
        User, through="GroupMember", related_name="members"
    )

    def __str__(self):
        return f"{self.name}"

    def add_group_member(self, user: User):
        member = self.members.filter(user=user)
        if not member.exists():
            GroupMember.objects.create(user=user, group=self)

    def remove_group_member(self, user_id):
        members = self.members.filter(user_id=user_id)
        if members.exists():
            members.delete()

    @property
    def last_message(self):
        return self.messages.last()

    def set_member_as_admin(self, user: User):
        member = self.members.filter(user=user)
        if member.exists():
            _member: GroupMember = member.get(user=user)
            _member.is_admin = True
            _member.save()


class GroupMember(models.Model):
    """
    GroupMember Model
    """

    user = models.ForeignKey(
        User, related_name="group_members", on_delete=models.CASCADE
    )
    group = models.ForeignKey(
        GroupConversation, related_name="group_members", on_delete=models.CASCADE
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    joined_on = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """
        Meta Class
        """

        unique_together = (("user", "group"),)

    def __str__(self) -> str:
        return f"{self.user} - {self.group}"


class MessageType(PolymorphicModel):
    """MessageType Model"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class TextMessage(MessageType):
    text = models.CharField(max_length=98)

    def __str__(self) -> str:
        return f"{self.text}"


class FileMessage(MessageType):
    """FileMessageType Model"""

    text = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="message_types/")

    def get_file_type(self):
        """
        This functions get the file type of a file
        """
        return self.file.name.split(".")[-1]

    def __str__(self) -> str:
        return f"{self.text}"


class StoryReplyMessage(MessageType):
    story = models.ForeignKey(Story, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.story}"


class LinkMessage(MessageType):
    url = models.URLField()

    def __str__(self):
        return f"{self.url}"


class Message(models.Model):
    """Message Model"""

    conversation = models.ForeignKey(
        Chat, related_name="messages", on_delete=models.CASCADE
    )
    sender = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE)
    file = models.FileField(upload_to="files/", null=True, blank=True)
    content = models.ForeignKey(MessageType, on_delete=models.CASCADE)
    parent_message = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.sender} - {self.conversation} - {self.content}"


class Seen(models.Model):
    """Seen Model"""

    message = models.ForeignKey(Message, related_name="seen", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="seen", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user} - {self.message}"


class MessageReactions(models.Model):
    """MessageReactions Model"""

    REACTIONS_EMOJI = (
        ("LIKE", "👍"),
        ("LOVE", "😍"),
        ("HAHA", "🤣"),
        ("WOW", "😲"),
        ("SAD", "😓"),
        ("ANGRY", "😡"),
    )
    message = models.ForeignKey(
        Message, related_name="reactions", on_delete=models.CASCADE
    )
    reaction = models.CharField(max_length=10, choices=REACTIONS_EMOJI)
    user = models.ForeignKey(User, related_name="reactions", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user} - {self.message}"
