from rest_framework import serializers

from accounts.api.serializers import UserSerializer

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
)

from rest_polymorphic.serializers import PolymorphicSerializer


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"


class ConversationListSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Conversation
        fields = "__all__"


class GroupConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupConversation
        fields = "__all__"


class GroupMemberListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=True)

    class Meta:
        model = GroupMember
        fields = "__all__"


class GroupConversationListSerializer(serializers.ModelSerializer):
    user = GroupMemberListSerializer(read_only=True, many=True)

    class Meta:
        model = GroupConversation
        fields = "__all__"


class ChatPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Conversation: ConversationListSerializer,
        GroupConversation: GroupConversationListSerializer,
    }


class MessageSerializer(serializers.ModelSerializer):
    conversation = ChatPolymorphicSerializer()

    class Meta:
        model = Message
        fields = "__all__"


class SeenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seen
        fields = "__all__"


class GroupMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = "__all__"


class MessageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageType
        fields = "__all__"


class FileMessageSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()

    class Meta:
        model = FileMessage
        fields = "__all__"

    def get_size(self, obj: FileMessage):
        return obj.file.storage.size()


class TextMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextMessage
        fields = "__all__"


class MessageTypePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        MessageType: MessageTypeSerializer,
        FileMessage: FileMessageSerializer,
        TextMessage: TextMessageSerializer,
    }
