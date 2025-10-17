from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

from .serializers import RegisterSerializer, PostSerializer, CommentSerializer
from .models import Post, Comment



class RegisterView(generics.CreateAPIView):
  serializer_class = RegisterSerializer
  permission_classes = [permissions.AllowAny]


class PostListCreateView(generics.ListCreateAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.select_related('author').all()

  def perform_create(self, serializer):
    serializer.save(author=self.request.user)

  def get_permissions(self):
    if self.request.method == 'POST':
      return [IsAuthenticated()]
    return [permissions.AllowAny()]
  

class PostRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.select_related('author').all()

  def get_permissions(self):
    if self.request.method in ['PUT','PATCH','DELETE']:
      return [IsAuthenticated()]
    return [permissions.AllowAny()]
  

  def perform_update(self, serializer):
    post = self.get_object()
    if post.author != self.request.user:
      raise PermissionDenied("You can only edit your own posts.")
    serializer.save()

  
  def perform_destroy(self, instance):
    if instance.author != self.request.user:
      raise PermissionDenied("You can only delete your own posts.")
    instance.delete()
    

class MyPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return posts created by the logged-in user
        return Post.objects.filter(author=self.request.user).select_related('author')


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
      post_id = self.kwargs['pk']
      return Comment.objects.filter(post_id=post_id).select_related('user')

    def perform_create(self, serializer):
      post = get_object_or_404(Post, pk=self.kwargs['pk'])
      serializer.save(user=self.request.user, post=post)

    def get_permissions(self):
      if self.request.method == 'POST':
        return [IsAuthenticated()]
      return [permissions.AllowAny()]    
  
  
class LikePostView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.likes.add(request.user)
    return Response({'likes_count': post.likes.count(), 'liked': True}, status=status.HTTP_200_OK)
  


class UnlikePostView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.likes.remove(request.user)
    return Response({'likes_count': post.likes.count(), 'liked': False}, status=status.HTTP_200_OK)
