from django.contrib import admin
from .models import Post, PostComment, PostReactions, PostMedia, Reaction, CommentReactions


# Register your models here.


class PostMediaInline(admin.TabularInline):
    model = PostMedia
    extra = 0

class PostCommentInline(admin.TabularInline):
    model = PostComment
    extra = 0

class PostReactionInline(admin.TabularInline):
    model = PostReactions
    extra = 0

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "content", "created_by"]
    search_fields = ["title", "created_by__username"]
    inlines = [PostMediaInline,PostCommentInline,PostReactionInline]
    readonly_fields = ["updated", "created_at"]
    list_per_page = 25


@admin.register(PostMedia)
class PostMediaAdmin(admin.ModelAdmin):
    pass


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    pass


@admin.register(PostReactions)
class PostReactionAdmin(admin.ModelAdmin):
    pass


@admin.register(CommentReactions)
class CommentReactionsAdmin(admin.ModelAdmin):
    pass
