# app/urls.py

from django.urls import path
from .views import FileUploadView, FileListView, CreateEncryptedFile
from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('api/upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/files/', FileListView.as_view(), name='file-list'),
    path('api/upload/encrypted/', CreateEncryptedFile.as_view(), name='encrypted-file-upload'),
    path('register/', RegisterView.as_view(), name='register'),
]
