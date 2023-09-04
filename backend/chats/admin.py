from django.contrib import admin

from .models import Chat,Conversation,GroupConversation,GroupMember,Message,Seen,Story,StoryViewer

from polymorphic.admin import (
    PolymorphicParentModelAdmin,
    PolymorphicChildModelAdmin,
    PolymorphicChildModelFilter,
)

# Register your models here.

@admin.register(Chat)
class ChatAdmin(PolymorphicParentModelAdmin):
    list_display = ['is_group','created_at']
    base_model = Chat
    child_models = [
        Conversation,
        GroupConversation
    ]
    list_filter = (PolymorphicChildModelFilter,)


class GroupMemberInline(admin.TabularInline):
    model=GroupMember
    extra = 1

@admin.register(GroupConversation)
class GroupConversationAdmin(admin.ModelAdmin):
    list_display=('name', 'description','created_by' )

    inlines = [
        GroupMemberInline]

@admin.register(GroupMember)
class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ('user','group','is_active','is_admin','joined_on')

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display=['id']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display=['conversation','sender','file','content','parent_message','created_at']

@admin.register(Seen)
class SeenAdmin(admin.ModelAdmin):
    list_display=["id","message","user",'created_at']

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ['user','content','file','created_at']

@admin.register(StoryViewer)
class StoryAdmin(admin.ModelAdmin):
    list_display=['id',"story","user","created_at"]