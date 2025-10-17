from django.urls import path
from .views import RegisterView, PostListCreateView, PostRetrieveUpdateDeleteView, CommentListCreateView, LikePostView, UnlikePostView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [
  path('auth/register/', RegisterView.as_view(), name='register'),
  path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


  path('posts/', PostListCreateView.as_view(), name='posts_list_create'),
  path('posts/<int:pk>/', PostRetrieveUpdateDeleteView.as_view(), name='post_detail'),
  path('posts/<int:pk>/comments/', CommentListCreateView.as_view(), name='post_comments'),
  path('posts/<int:pk>/like/', LikePostView.as_view(), name='post_like'),
  path('posts/<int:pk>/unlike/', UnlikePostView.as_view(), name='post_unlike'),

]