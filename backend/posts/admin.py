from django.contrib import admin
from .models import Post, PostComment, PostReactions, PostMedia


# Register your models here.


class PostMediaInline(admin.TabularInline):
    model = PostMedia
    extra = 0


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "content", "created_by"]
    search_fields = ["title", "created_by__username"]
    inlines = [PostMediaInline]
    readonly_fields = ["updated", "created_at"]


@admin.register(PostMedia)
class PostMediaAdmin(admin.ModelAdmin):
    pass


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    pass


@admin.register(PostReactions)
class PostReactionAdmin(admin.ModelAdmin):
    pass
