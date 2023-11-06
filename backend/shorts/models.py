from django.db import models

# Create your models here.

from django.contrib.auth import get_user_model

User = get_user_model()


class Shorts(models.Model):
    """Shorts Model"""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shorts')
    text = models.TextField()
    video = models.FileField(upload_to='shorts/videos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.text[:20]}"

    class Meta:
        ordering = ['-created_at']

        verbose_name_plural = 'shorts'


class ShortViewer(models.Model):
    short = models.ForeignKey(Shorts, related_name="views", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='short_view', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} view {self.short} on {self.created_at}"


class ShortsComment(models.Model):
    """ShortsComment Model"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shorts = models.ForeignKey(Shorts, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.text[:20]}"

    class Meta:
        ordering = ['-created_at']


class ShortsLike(models.Model):
    """ShortsLike Model"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shorts = models.ForeignKey(Shorts, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} Liked {self.shorts.text[:20]}"

    class Meta:
        ordering = ['-created_at']
