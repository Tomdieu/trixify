from rest_framework import status
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
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
    GroupConversation,
    GroupMember,
    MessageReactions
)
from .serializers import (
    MessageSerializer,
    SeenSerializer,
    ConversationSerializer,
    ChatPolymorphicSerializer,
    GroupConversationSerializer,
    GroupMemberSerializer,
    MessageReactionsSerializer,AddGroupMemberSerializer, JoinRemoveGroupMemberSerializer, CreateGroupConversationSerializer,
    GroupConversationListSerializer,
)

# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
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


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
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
    serializer_class = MessageSerializer

    @action(methods=['GET', 'POST', 'DELETE'], detail=True, serializer_class=MessageReactionsSerializer)
    def reactions(self, request, pk=None):
        msg_obj = self.get_object()

        reactions = MessageReactions.objects.filter(message_id=msg_obj.id)
        serializer = MessageReactionsSerializer(reactions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
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


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
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
    serializer_class = ConversationSerializer


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
class GroupConversationViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = GroupConversation.objects.all()

    # serializer_class = GroupConversationSerializer

    def get_serializer_class(self):

        if self.action == "create":
            return CreateGroupConversationSerializer
        if self.action in ["list", "retrieve"]:
            return GroupConversationListSerializer
        elif self.action in ["update", "partial_update"]:
            return GroupConversationSerializer
        elif self.action == "messages":
            return MessageSerializer
        elif self.action == "members":
            return GroupMemberSerializer
        elif self.action in ["remove_member"]:
            return JoinRemoveGroupMemberSerializer
        elif self.action in  ["add_member"]:
            return AddGroupMemberSerializer
        elif self.action in  ["join"]:
            return None

        return GroupConversationSerializer
    
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

   
    @action(methods=['GET', 'POST'], detail=True)
    def messages(self, request, pk=None):

        group_obj = self.get_object()

        if request.method == "GET":

            serializer = MessageSerializer(Message.objects.filter(conversation=group_obj), many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.method == "POST":

            serializer = MessageSerializer(data=request.data)

            serializer.is_valid(raise_exception=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk=None):
        group_obj: GroupConversation = self.get_object()

        if group_obj.created_by == self.request.user:
            group_obj.delete()

            return Response({"message": "group deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"detail": "You are not authorized to perform this action"},
                        status=status.HTTP_401_UNAUTHORIZED)


    @action(methods=['GET'], detail=True)
    def members(self, request, pk=None):

        group_obj = self.get_object()
        group_members = GroupMember.objects.filter(group_id=group_obj)
        serializer = GroupMemberSerializer(group_members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(methods=['POST'], detail=True, url_path='add-member')
    def add_member(self, request, pk=None):

        group_obj: GroupConversation = self.get_object()

        serializer = JoinRemoveGroupMemberSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        for user in serializer.validated_data['user_id']:
            group_obj.add_group_member(serializer.validated_data['user_id'])

            serializer = self.get_serializer(group_obj)

        return Response({"message":"Members added successfully"}, status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail=True)
    def join(self, request, pk=None):

        group_obj: GroupConversation = self.get_object()

        group_obj.add_group_member(request.user)

        serializer = self.get_serializer(group_obj)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['POST'], detail=True,
            url_path='remove-member')
    def remove_member(self, request, pk=None):
        group_obj: GroupConversation = self.get_object()
        serializer = JoinRemoveGroupMemberSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group_obj.remove_group_member(request.data.get('user_id'))

        return Response(status=status.HTTP_200_OK)


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
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


@authentication_classes([TokenAuthentication, BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
class MessageReactionViewSet(CreateModelMixin,
                             ListModelMixin,
                             RetrieveModelMixin,
                             UpdateModelMixin,
                             DestroyModelMixin,
                             GenericViewSet, ):
    queryset = MessageReactions.objects.all()
    serializer_class = MessageReactionsSerializer
