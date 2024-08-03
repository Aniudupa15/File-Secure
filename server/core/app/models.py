from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class File(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    
class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    