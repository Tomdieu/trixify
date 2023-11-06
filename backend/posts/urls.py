from django.urls import path,include

app_name = "posts"

urlpatterns = [
    path("posts/",include("posts.api.urls"))
]