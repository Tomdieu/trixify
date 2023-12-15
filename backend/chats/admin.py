from django.contrib import admin

from .models import (
    Chat,
    Conversation,
    ConversationUser,
    Group,
    GroupMember,
    Message,
    Seen,
    MessageType,
    FileMessage,
    TextMessage,
    PositionMessage,
    StoryReplyMessage,
MessageReactions
)

from polymorphic.admin import (
    PolymorphicParentModelAdmin,
    PolymorphicChildModelAdmin,
    PolymorphicChildModelFilter,
)

# Register your models here.


class ModelChatAdmin(PolymorphicChildModelAdmin):
    base_model = Chat


@admin.register(Chat)
class ChatAdmin(PolymorphicParentModelAdmin):
    base_model = Chat
    child_models = (Conversation, Group)
    list_filter = [PolymorphicChildModelFilter]
    list_display = ["id", "created_at"]
    list_per_page = 25

class GroupMemberInline(admin.TabularInline):
    model = GroupMember
    extra = 1


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_by")
    readonly_fields = ['is_group']

    inlines = [GroupMemberInline]
    list_per_page = 25


@admin.register(GroupMember)
class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ("user", "group", "is_active", "is_admin", "joined_on")
    list_per_page = 25

class ConversationUserInline(admin.TabularInline):

    model = ConversationUser
    extra = 2
    max_num = 2


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ["id"]
    list_per_page = 25
    readonly_fields = ['is_group']
    inlines = [ConversationUserInline]


class MessageTypeChildAdmin(PolymorphicChildModelAdmin):
    base_model = MessageType


@admin.register(MessageType)
class MessageTypeAdmin(PolymorphicParentModelAdmin):
    base_model = MessageType
    child_models = [FileMessage, TextMessage, StoryReplyMessage]
    list_filter = (PolymorphicChildModelFilter,)
    list_display = ["id", "created_at"]
    list_per_page = 25


@admin.register(FileMessage)
class FileMessageAdmin(MessageTypeChildAdmin):
    base_model = FileMessage
    list_display = ["id", "file", "created_at"]
    list_per_page = 25

@admin.register(TextMessage)
class TextMessageAdmin(MessageTypeChildAdmin):
    base_model = TextMessage
    list_display = ["id", "text", "created_at"]


@admin.register(StoryReplyMessage)
class StoryReplyMessageAdmin(admin.ModelAdmin):
    list_display = ['id','story','created_at']
    list_per_page = 25

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "chat",
        "sender",
        "content",
        "parent_message",
        "created_at",
    ]
    list_per_page = 25


@admin.register(Seen)
class SeenAdmin(admin.ModelAdmin):
    list_display = ["id", "message", "user", "created_at"]
    list_per_page = 25


@admin.register(MessageReactions)
class MessageReactionsAdmin(admin.ModelAdmin):
    list_display = ['id','message','reaction','user']
    list_per_page = 25

@admin.register(PositionMessage)
class PositionMessageAdmin(admin.ModelAdmin):
    pass