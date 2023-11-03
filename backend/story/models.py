from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Story(models.Model):
    """Story Model"""

    user = models.ForeignKey(User, related_name="stories", on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to="stories/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user} - Story"


class StoryViewer(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name="views")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="story_viewer"
    )
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} view {self.story}"
