from django.db import models

from django.contrib.auth import get_user_model
from django.utils import timezone

# Create your models here.

User = get_user_model()

class Category(models.Model):

    name = models.CharField(max_length=255)

class Channel(models.Model):

    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(User,related_name="channels",on_delete=models.CASCADE)
    icon = models.ImageField(upload_to='channel_icon',blank=True,null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)


class ChannelSubscribe(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE,related_name='subscribers')
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='channels_subscribe')
    favorite = models.Boolean(default=False)  
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = (('channel','user'),)
        
class Poll(models.Model):
    question = models.CharField(max_length=255)
    pub_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()

    @property
    def ended(self):
        return timezone.now() > self.end_date

    def __str__(self):
        return self.question

class Answer(models.Model):

    poll = models.ForeignKey(Poll,related_name="answers")
    answer_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    class Meta:
        unique_together = (('poll','answer_text'),)


class Post(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(null=True,blank=True)

    channel = models.ForeignKey(Channel,on_delete=models.CASCADE)

    file = models.FileField(upload_to='post_media',null=True,blank=True)
    poll = models.OneToOneField(Poll, null=True, blank=True, on_delete=models.CASCADE)
    
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.title}"


class Like(models.Model):

    post = models.ForeignKey(Post,related_name="likes",on_delete=models.CASCADE)
    user = models.ForeignKey(User,related_name="likes",on_delete=models.CASCADE)

    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} like {self.post}"

class View(models.Model):
    post = models.ForeignKey(Post,related_name="views",on_delete=models.CASCADE)
    user = models.ForeignKey(User,related_name="views",on_delete=models.CASCADE)

    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} view {self.post}"