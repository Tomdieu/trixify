from django.contrib import admin
from .models  import (Answer,Channel,Category,ChannelSubscribe,Like,Poll,Post,View,Vote)
import nested_admin
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    
@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('id','name',)

@admin.register(ChannelSubscribe)
class ChannelSubscribeAdmin(admin.ModelAdmin):
    list_display = ('user','channel','favorite')

class AnswerInline(nested_admin.NestedTabularInline):
    model = Answer
    extra = 2
    

class PollInline(nested_admin.NestedTabularInline):
    model = Poll
    inlines = [AnswerInline]

class ViewInline(nested_admin.NestedTabularInline):
    model = View

@admin.register(Post)
class PostAdmin(nested_admin.NestedModelAdmin):
    list_display=('title', 'description' , 'channel', 'created_at')
    inlines = [PollInline,ViewInline]
    
@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user','post')

@admin.register(View)
class ViewAdmin(admin.ModelAdmin):
    list_display = ('user','post')

@admin.register(Poll)
class PollAdmin(admin.ModelAdmin):
    list_display = ('question','pub_date','end_date','ended')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('poll','answer_text','votes')

@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('user','answer')