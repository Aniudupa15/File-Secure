from rest_framework import generics
from .models import File
from .serializers import FileSerializer

class FileUploadView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def perform_create(self, serializer):
        file = self.request.data.get('file')
        serializer.save(file=file)

class FileListView(generics.ListAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
