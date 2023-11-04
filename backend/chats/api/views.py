from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.viewsets import GenericViewSet

from .serializers import (
    ChatSerializer,
    MessageSerializer,
    SeenSerializer,
    ConversationSerializer,
    ChatPolymorphicSerializer,
    GroupConversationSerializer,
    GroupMemberSerializer,
    MessageTypeSerializer,
    FileMessageSerializer,
    TextMessageSerializer,
    MessageReactionsSerializer
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from chats.models import (
    Chat,
    Message,
    Seen,
    Conversation,
    GroupConversation,
    GroupMember,
    MessageType,
    FileMessage,
    TextMessage,
    LinkMessage, StoryReplyMessage,
    MessageReactions
)


class ChatViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Chat.objects.all()
    serializer_class = ChatPolymorphicSerializer


class MessageViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class SeenViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Seen.objects.all()
    serializer_class = SeenSerializer


class ConversationViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer


class GroupConversationViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = GroupConversation.objects.all()
    serializer_class = GroupConversationSerializer


class GroupMemberViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer


class MessageReactionViewSet(CreateModelMixin,
                             ListModelMixin,
                             RetrieveModelMixin,
                             UpdateModelMixin,
                             DestroyModelMixin,
                             GenericViewSet, ):

    queryset = MessageReactions.objects.all()
    serializer_class = MessageReactionsSerializer
