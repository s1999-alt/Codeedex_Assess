from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
  email = models.EmailField(unique=True)

  REQUIRED_FIELDS = ['email']


class Post(models.Model):
  title = models.CharField(max_length=255)
  content = models.TextField()
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
  created_at = models.DateTimeField(auto_now_add=True)
  likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)

  def __str__(self):
    return self.title
  

