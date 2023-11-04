from django.contrib import admin

from .models import (
    Chat,
    Conversation,
    GroupConversation,
    GroupMember,
    Message,
    Seen,
    MessageType,
    FileMessage,
    TextMessage,
    StoryReplyMessage,
    LinkMessage,
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
    child_models = (Conversation, GroupConversation)
    list_filter = [PolymorphicChildModelFilter]
    list_display = ["id", "created_at"]
    list_per_page = 25

class GroupMemberInline(admin.TabularInline):
    model = GroupMember
    extra = 1


@admin.register(GroupConversation)
class GroupConversationAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_by")

    inlines = [GroupMemberInline]
    list_per_page = 25


@admin.register(GroupMember)
class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ("user", "group", "is_active", "is_admin", "joined_on")
    list_per_page = 25

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ["id"]
    list_per_page = 25


class MessageTypeChildAdmin(PolymorphicChildModelAdmin):
    base_model = MessageType


@admin.register(MessageType)
class MessageTypeAdmin(PolymorphicParentModelAdmin):
    base_model = MessageType
    child_models = [FileMessage, TextMessage, StoryReplyMessage, LinkMessage]
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


@admin.register(LinkMessage)
class LinkMessageAdmin(MessageTypeChildAdmin):
    base_model = LinkMessage
    list_display = ['id','url','created_at']
    list_per_page = 25

@admin.register(StoryReplyMessage)
class StoryReplyMessageAdmin(admin.ModelAdmin):
    list_display = ['id','story','created_at']
    list_per_page = 25

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "conversation",
        "sender",
        "file",
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