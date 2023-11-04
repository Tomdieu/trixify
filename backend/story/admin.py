from django.contrib import admin

from .models import Story,StoryViewer

# Register your models here.


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ['id','user']

@admin.register(StoryViewer)
class StoryViewerAdmin(admin.ModelAdmin):
    list_display = ['id','story','user','created_at']