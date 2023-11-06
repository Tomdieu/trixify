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
    StoryReplyMessage, LinkMessage, MessageReactions
)

from django.contrib.auth import get_user_model

from rest_polymorphic.serializers import PolymorphicSerializer

from drf_extra_fields import fields

from django.db.models import Q

User = get_user_model()


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"


class CreateConversationSerializer(serializers.ModelSerializer):
    users = serializers.ListSerializer(child=serializers.IntegerField())

    class Meta:
        model = Conversation
        fields = ['users']

    def validate_users(self, users_id):
        users = []

        if len(users_id) < 2:
            raise serializers.ValidationError({"users": "you need to create a group with at least 2 users"})

        for user_id in users_id:
            user = User.objects.filter(id=user_id)

            if not user.exists():
                raise serializers.ValidationError({"users": f"user with id {user_id} does not exists"})
            users.append(user[0])

        return users

class GroupConversationDetailSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    class Meta:
        model = GroupConversation
        fields = ['id','name','group_icon','members']

    def get_members(self,obj:GroupConversation):
        
        members_names =[]

        members = obj.members.all()
        
        context = self.context["request"]
        current_user = context.user
        
        for member in members:
            if member.user.username == current_user.username:
                members_names.append("You")
            else:
                members_names.append(member.user.username)
        
        return members_names

class ConversationListSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    name = serializers.SerializerMethodField()
    is_online = serializers.SerializerMethodField()
    groups_in_common = serializers.SerializerMethodField()
    latest_message = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = "__all__"

    def __get_user(self,obj:Conversation):
        current_user = self.context['request'].user
        # print("Obj : ",obj.participants.get(~Q(user=current_user)).user)
        return obj.participants.get(~Q(user=current_user)).user

    def get_name(self,obj:Conversation):
        return self.__get_user(obj).username
    
    def get_is_online(self,obj:Conversation):
        return self.__get_user(obj).is_online
    
    def get_groups_in_common(self,obj:Conversation):

        other_user = self.__get_user(obj)

        current_user = self.context['request'].user

        groups_in_common = GroupConversation.objects.filter(group_members__user=current_user).filter(group_members__user=other_user)

        return GroupConversationDetailSerializer(groups_in_common,context=self.context,many=True).data
    
    def get_latest_message(self,obj:Conversation):
        last_message = obj.messages.last()
        if last_message:
            return MessageSerializer(last_message,many=True,context=self.context).data
        return {}

    def get_user(self,obj:Conversation):

        other_user = self.__get_user(obj)


        return UserSerializer(other_user,context=self.context).data


class CreateGroupConversationSerializer(serializers.ModelSerializer):
    users = serializers.ListSerializer(child=serializers.IntegerField())
    # group_icon = serializers.ImageField()
    group_icon = fields.Base64ImageField()


    class Meta:
        model = GroupConversation
        fields = ['name', 'description', 'group_icon', 'users']

    def validate_user(self, users_ids):

        users = []
        for user_id in users_ids:
            user = User.objects.filter(id=user_id)
            if user.exists():
                users.append(user[0])

        return users


class GroupConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupConversation
        fields = "__all__"


class JoinRemoveGroupMemberSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

    def validate_user_id(self, user_id):
        user = User.objects.filter(id=user_id)
        if not user.exists():
            raise serializers.ValidationError({"user_id": f"The user with  id {user_id} doesn't exists"})
        return user[0]

class AddGroupMemberSerializer(serializers.Serializer):
    users_id = serializers.ListField(min_length=1)

    def validate_users_id(self, users_id):
        users = []
        for user_id in users_id:
            user = User.objects.filter(id=user_id)
            if not user.exists():
                raise serializers.ValidationError({"user_id": f"The user with  id {user_id} doesn't exists"})
            users.append(user)

        return users

class GroupMemberListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = GroupMember
        fields = ('user', 'is_active', 'is_admin', 'joined_on')


class GroupConversationListSerializer(serializers.ModelSerializer):
    users: list[GroupMemberListSerializer] = serializers.SerializerMethodField()

    class Meta:
        model = GroupConversation
        fields = "__all__"

    def get_users(self, obj: GroupConversation):
       
        return GroupMemberListSerializer(GroupMember.objects.filter(group=obj), many=True).data


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


class LinkMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkMessage
        fields = '__all__'


class StoryReplyMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryReplyMessage
        fields = '__all__'


class TextMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextMessage
        fields = "__all__"


class MessageTypePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        MessageType: MessageTypeSerializer,
        FileMessage: FileMessageSerializer,
        TextMessage: TextMessageSerializer,
        LinkMessage: LinkMessageSerializer,
        StoryReplyMessage: StoryReplyMessageSerializer
    }


class MessageReactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageReactions
        fields = '__all__'
