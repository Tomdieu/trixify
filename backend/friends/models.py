from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Friend(models.Model):
    user = models.ForeignKey(User, related_name="friends", on_delete=models.CASCADE)
    friend = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'friend']

    def __str__(self) -> str:
        return f"{self.user} is friend with {self.friend}"


class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name="friend_requests_sent", on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name="friend_requests_received", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    rejected_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ['from_user', 'to_user']

    def __str__(self) -> str:
        if self.rejected_by:
            return f"{self.from_user} sent a friend request to {self.to_user}, rejected by {self.rejected_by}"
        else:
            return f"{self.from_user} sent a friend request to {self.to_user}"


