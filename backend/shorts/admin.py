from django.contrib import admin

from .models import Shorts, ShortsComment, ShortsLike, ShortViewer


# Register your models here.

class ShortViewerInline(admin.TabularInline):
    model = ShortViewer
    extra = 0


class ShortsCommentInline(admin.TabularInline):
    model = ShortsComment
    extra = 0


class ShortsLikeInline(admin.TabularInline):
    model = ShortsLike
    extra = 0


@admin.register(Shorts)
class ShortsAdmin(admin.ModelAdmin):
    list_per_page = 25
    inlines = [ShortsCommentInline, ShortsCommentInline, ShortsLikeInline]
    list_display = ['id', 'user', 'text', 'video', 'created_at']


admin.site.register(ShortsComment)

admin.site.register(ShortsLike)

admin.site.register(ShortViewer)
