from django.shortcuts import render
from rest_framework import generics
from .models import File
from .serializers import FileSerializer

class FileUploadView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class FileListView(generics.ListAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
