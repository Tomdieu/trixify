from rest_framework import serializers

from posts.models import Post,PostMedia,PostComment,PostReactions,CommentReactions

from accounts.api.serializers import UserSerializer


class PostDetailSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True,many=True)
    class Meta:

        model = Post
        fields = ['id','title','content','created_by','updated','created_at']

class PostMediaCreateSerializer(serializers.ModelSerializer):

    class Meta:

        model = PostMedia
        fields = ['file']


class PostCreateSerializer(serializers.ModelSerializer):
    medias = PostMediaCreateSerializer(many=True)
    class Meta:
        model = Post
        fields = ['id','title','content','updated','created_at','medias']

    
class PostSerializer(serializers.ModelSerializer):

    class Meta:

        model = Post
        fields = ['id','title','content','created_by','updated','created_at']


class PostMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostMedia
        fields = ['file']

class PostCommentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostComment
        fields = ['parent','content']

class PostCommentUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostComment
        fields = ['content']



class PostCommentSerializer(serializers.ModelSerializer):

    # parent = 

    class Meta:
        model = PostComment
        fields = ['post','parent','content','created_by','created_at']

class PostReactionCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostReactions
        fields = ['reaction','post']

class PostReactionUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostReactions
        fields = ['reaction','post']


class PostReactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)
    class Meta:
        model = PostReactions
        fields = ['reaction','post','user']


class CommentReactionCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommentReactions
        fields = ['reaction','comment']

class CommentReactionUpdateSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = CommentReactions
        fields = ['reaction']




class CommentReactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)
    class Meta:
        model = CommentReactions
        fields = ['reaction','comment','user']


