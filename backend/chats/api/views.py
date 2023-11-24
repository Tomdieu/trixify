from rest_framework import status
from rest_framework.authentication import (
    TokenAuthentication,
    BasicAuthentication,
    SessionAuthentication,
)
from rest_framework.decorators import action
from rest_framework.decorators import authentication_classes, permission_classes, schema
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chats.models import (
    Chat,
    Message,
    Seen,
    Conversation,
    Group,
    GroupMember,
    MessageReactions,
)
from .serializers import (
    MessageCreateSerializer,
    MessageReactionsCreateSerializer,
    MessageSerializer,
    MessageListSerializer,
    SeenSerializer,
    ConversationSerializer,
    CreateConversationSerializer,
    ChatPolymorphicSerializer,
    GroupSerializer,
    GroupMemberSerializer,
    MessageReactionsSerializer,
    AddGroupMemberSerializer,
    JoinRemoveGroupMemberSerializer,
    CreateGroupConversationSerializer,
    GroupListSerializer,
    NullSerializer
)

# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class ChatViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    # UpdateModelMixin,
    # DestroyModelMixin,
    GenericViewSet,
):
    queryset = Chat.objects.all()
    serializer_class = ChatPolymorphicSerializer


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class MessageViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Message.objects.all()
    serializer_class = MessageListSerializer

    def get_serializer_class(self):

        if self.action in ["create"]:
            return MessageCreateSerializer
        elif self.action in ["list", "retrieve"]:
            return MessageListSerializer
        elif self.action in ["update", "partial_update"]:
            return MessageSerializer
        elif self.action == "reactions":
            if self.request.method == "GET":
                return MessageReactionsSerializer
            elif self.request.method == "POST":
                return MessageReactionsCreateSerializer
            return MessageReactionsSerializer
        000000000000000
    def create(self, request, *args, **kwargs):

        serializer = MessageCreateSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        serializer.save(sender=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(
        methods=["GET", "POST", "DELETE"],
        detail=True,
    )
    def reactions(self, request, pk=None):
        msg_obj = self.get_object()

        if request.method == "GET":
            reactions = MessageReactions.objects.filter(message_id=msg_obj.id)
            serializer = MessageReactionsSerializer(reactions, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif request.method == "POST":
            serializer = MessageReactionsCreateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user,message=msg_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        elif request.method == "DELETE":
            MessageReactions.objects.filter(message_id=msg_obj.id,user=request.user).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
    def delete(self, request, pk=None):
        msg_obj = self.get_object()
        if msg_obj.sender == request.user:
            msg_obj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"detail": "You are not authorized to perform this action"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
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


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class ConversationViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Conversation.objects.all()

    def get_serializer_class(self):
        if self.action in ["create"]:
            return CreateConversationSerializer
        elif self.action in ["messages"]:
            return MessageSerializer
        return ConversationSerializer
    
    @action(methods=['GET'],detail=True)
    def messages(self, request, pk=None):
        conversation_obj = self.get_object()
        messages = Message.objects.filter(chat=conversation_obj)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class GroupViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Group.objects.all()

    def get_serializer_class(self):
        if self.action in ["create"]:
            return CreateGroupConversationSerializer
        if self.action in ["list", "retrieve"]:
            return GroupListSerializer
        elif self.action in ["update", "partial_update"]:
            return GroupSerializer
        elif self.action == "messages":
            return MessageSerializer
        elif self.action == "members":
            return GroupMemberSerializer
        elif self.action in ["remove_member"]:
            return JoinRemoveGroupMemberSerializer
        elif self.action in ["add_member"]:
            return AddGroupMemberSerializer
        elif self.action in  ["join"]:
            return NullSerializer

        return GroupSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @action(methods=["GET", "POST"], detail=True)
    def messages(self, request, pk=None):
        group_obj = self.get_object()

        if request.method == "GET":
            serializer = MessageSerializer(
                Message.objects.filter(chat=group_obj), many=True
            )

            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "POST":
            serializer = MessageSerializer(data=request.data)

            serializer.is_valid(raise_exception=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk=None):
        group_obj: Group = self.get_object()

        if group_obj.created_by == self.request.user:
            group_obj.delete()

            return Response(
                {"message": "group deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )

        return Response(
            {"detail": "You are not authorized to perform this action"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    @action(methods=["GET"], detail=True)
    def members(self, request, pk=None):
        group_obj = self.get_object()
        group_members = GroupMember.objects.filter(group_id=group_obj)
        serializer = GroupMemberSerializer(group_members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["POST"], detail=True, url_path="add-member")
    def add_member(self, request, pk=None):
        group_obj: Group = self.get_object()

        serializer = JoinRemoveGroupMemberSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        group_obj.add_group_member(serializer.validated_data["user_id"])

        serializer = self.get_serializer(group_obj)

        return Response(
            {"message": "Members added successfully"}, status=status.HTTP_201_CREATED
        )

    @action(methods=["POST"], detail=True)
    def join(self, request, pk=None):
        group_obj: Group = self.get_object()

        group_obj.add_group_member(request.user)

        serializer = self.get_serializer(group_obj)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["POST"], detail=True, url_path="remove-member")
    def remove_member(self, request, pk=None):
        group_obj: Group = self.get_object()
        serializer = JoinRemoveGroupMemberSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group_obj.remove_group_member(request.data.get("user_id"))

        return Response(status=status.HTTP_200_OK)


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
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


@authentication_classes(
    [TokenAuthentication, BasicAuthentication, SessionAuthentication]
)
@permission_classes([IsAuthenticated])
class MessageReactionViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = MessageReactions.objects.all()
    serializer_class = MessageReactionsSerializer
