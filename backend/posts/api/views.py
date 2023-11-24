from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
)
from rest_framework.response import Response

from rest_framework.viewsets import GenericViewSet

from .serializers import (
    CommentReactionUpdateSerializer,
    PostCommentUpdateSerializer,
    PostReactionUpdateSerializer,
    PostSerializer,
    PostCreateSerializer,
    PostDetailSerializer,
    PostMediaCreateSerializer,
    PostMediaSerializer,
    PostCommentCreateSerializer,
    PostCommentSerializer,
    PostReactionCreateSerializer,
    PostReactionSerializer,
    CommentReactionCreateSerializer,
    CommentReactionSerializer,
)
from posts.models import Post, PostMedia, PostComment, PostReactions, CommentReactions

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import (
    TokenAuthentication,
    SessionAuthentication,
    BasicAuthentication,
)

from rest_framework.decorators import action, permission_classes, authentication_classes


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class PostViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Post.objects.all()

    serializer_class = PostSerializer

    def get_serializer_class(self):
        action = self.action

        if action in ["retrieve", "list"]:
            return PostDetailSerializer
        elif action in ["create"]:
            return PostCreateSerializer

        return PostSerializer

    @action(methods=["GET"], detail=True)
    def comments(self, request, pk=None):
        post_obj = self.get_object()
        comments = PostComment.objects.filter(post=post_obj)

        serializer = PostCommentSerializer(
            comments, many=True, context={"request": request}
        )

        return serializer.data

    @action(methods=["GET"], detail=True)
    def reactions(self, request, pk=None):
        post_obj = self.get_object()
        reactions = PostReactions.objects.filter(post=post_obj)

        serializer = PostReactionSerializer(
            reactions, many=True, context={"request": request}
        )

        return serializer.data


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class PostCommentViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    def get_serializer_class(self):
        action = self.action

        if action in ["create"]:
            return PostCommentCreateSerializer
        elif action in ["retrieve"]:
            return PostCommentSerializer
        elif action in ["update", "partial_update"]:
            return PostCommentUpdateSerializer
        elif action in ["reactions"]:
            return CommentReactionSerializer

        return PostCommentSerializer

    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer

    @action(methods=["GET"], detail=True)
    def reactions(self, request, pk=None):
        comment_obj = self.get_object()
        reactions = CommentReactions.objects.filter(comment=comment_obj)

        serializer = CommentReactionSerializer(
            reactions, many=True, context={"request": request}
        )

        return serializer.data


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class CommentReactionsViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = CommentReactions.objects.all()

    serializer_class = CommentReactionSerializer

    def get_serializer_class(self):
        action = self.action

        if action in ["create"]:
            return CommentReactionCreateSerializer

        elif action in ["retrieve"]:
            return CommentReactionSerializer

        elif action in ["update", "partial_update"]:
            return CommentReactionUpdateSerializer

        return CommentReactionSerializer


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class PostsReactionsViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = PostReactions.objects.all()

    serializer_class = PostReactionSerializer

    def get_serializer_class(self):
        action = self.action

        if action in ["create"]:
            return PostReactionCreateSerializer

        elif action in ["retrieve"]:
            return PostReactionSerializer

        elif action in ["update", "partial_update"]:
            return PostReactionUpdateSerializer

        return PostReactionSerializer
