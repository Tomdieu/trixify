from django.db import models

from django.contrib.auth import get_user_model
from django.utils import timezone

# Create your models here.

User = get_user_model()


class Category(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Channel(models.Model):

    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(
        User, related_name="channels", on_delete=models.CASCADE)
    icon = models.ImageField(upload_to='channel_icon', blank=True, null=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name="channels")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        unique_together = (('name', 'created_by'),)

    def __str__(self):
        return f"{self.name} - {self.created_by}"


class ChannelSubscribe(models.Model):
    channel = models.ForeignKey(
        Channel, on_delete=models.CASCADE, related_name='subscribers')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='channels_subscribe')
    favorite = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = (('channel', 'user'),)

    def __str__(self):
        return f"{self.user} subscribe {self.channel}"

class Post(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)

    file = models.FileField(upload_to='post_media', null=True, blank=True)
    
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.title}"

class Poll(models.Model):
    question = models.CharField(max_length=255)
    pub_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    post = models.OneToOneField(Post,related_name='poll',null=True, blank=True, on_delete=models.CASCADE)

    @property
    def ended(self)->bool:
        # Convert self.end_date to a datetime object for comparison
        end_datetime = timezone.make_aware(timezone.datetime.combine(self.end_date, timezone.datetime.min.time()))
        return timezone.now() > end_datetime

    def __str__(self):
        return self.question


class Answer(models.Model):

    poll = models.ForeignKey(Poll, related_name="answers",on_delete=models.CASCADE)
    answer_text = models.CharField(max_length=200)
    votes_count = models.IntegerField(default=0)

    class Meta:
        unique_together = (('poll', 'answer_text'),)

    def __str__(self):
        return self.answer_text


class Vote(models.Model):

    user = models.ForeignKey(User, related_name="votes",on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, related_name="votes",on_delete=models.CASCADE)

    class Meta:
        unique_together = (('user', 'answer'),)

    def __str__(self):
        return f"{self.user} vote {self.answer}"





class Like(models.Model):

    post = models.ForeignKey(Post, related_name="likes",
                             on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="likes",
                             on_delete=models.CASCADE)

    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} like {self.post}"


class View(models.Model):
    post = models.ForeignKey(Post, related_name="views",
                             on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="views",
                             on_delete=models.CASCADE)

    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} view {self.post}"
