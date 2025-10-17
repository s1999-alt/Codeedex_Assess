from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Post, Comment



class RegisterSerializer(serializers.ModelSerializer):
  password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password1', 'password2']

  def validate(self, attrs):
    if attrs['password1'] != attrs['password2']:
      raise serializers.ValidationError({"password": "Passwords must match"})
    return attrs
  
  def create(self, validated_data):
    user = User(
      username = validated_data['username'],
      email = validated_data['email']
    )
    user.set_password(validated_data['password1'])
    user.save()
    return user
  

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email']



class CommentSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Comment
    fields = ['id', 'post', 'user', 'message', 'created_at']
    read_only_fields = ('id', 'user', 'created_at')


class PostSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)
  likes_count = serializers.SerializerMethodField()
  liked_by_user = serializers.SerializerMethodField()

  class Meta:
    model = Post
    fields = ['id','title','content','author','created_at','likes_count','liked_by_user']

  def get_likes_count(self, obj):
    return obj.likes.count()
  
  def get_liked_by_user(self, obj):
      request = self.context.get('request')
      if request and request.user.is_authenticated:
          return obj.likes.filter(pk=request.user.pk).exists()
      return False


  



  


  
