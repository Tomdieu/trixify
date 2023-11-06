from rest_framework.routers import DefaultRouter

from django.urls import path

from . import views

router = DefaultRouter()

router.register("",views.PostViewSet,basename="posts")
router.register("post-reaction",views.PostsReactionsViewSet,basename="post-reaction")
router.register("comments",views.PostCommentViewSet,basename="post-comments")
router.register("comments-reactions",views.CommentReactionsViewSet,basename="comments-reactions")


urlpatterns = [

]

urlpatterns += router.urls