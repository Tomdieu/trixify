from django.db import models
from django.contrib.auth import get_user_model
from polymorphic.models import PolymorphicModel

# Create your models here.

User = get_user_model()


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_by = models.ForeignKey(
        User, related_name="created_posts", on_delete=models.CASCADE
    )
    updated = models.BooleanField(default=False, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.created_by}"


class PostMedia(models.Model):
    post = models.ForeignKey(Post, related_name="medias", on_delete=models.CASCADE)
    file = models.FileField(upload_to="post/media/")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PostComment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    parent = models.ForeignKey(
        "self", related_name="replies", on_delete=models.CASCADE, blank=True, null=True
    )
    content = models.TextField()
    created_by = models.ForeignKey(
        User, related_name="created_comments", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.content}"


class Reaction(PolymorphicModel):
    REACTIONS = (
        ("LIKE", "👍"),
        ("LOVE", "😍"),
        ("HAHA", "🤣"),
        ("WOW", "😲"),
        ("SAD", "😓"),
        ("ANGRY", "😡"),
    )
    reaction = models.CharField(max_length=10, choices=REACTIONS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, related_name="impressions", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"User : {self.user} React : {self.reaction}"


class PostReactions(Reaction):
    post = models.ForeignKey(Post, related_name="reactions", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} React : {self.reaction} to  Post : {self.post}"


class CommentReactions(Reaction):
    comment = models.ForeignKey(PostComment, related_name="reactions", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} React : {self.reaction} to Comment : {self.comment}"
