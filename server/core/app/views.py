# app/views.py

from rest_framework import generics
from .models import File
from .serializers import FileSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer


class FileUploadView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class FileListView(generics.ListAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

from django.core.files.uploadhandler import MemoryFileUploadHandler, TemporaryFileUploadHandler
from django.views.generic.edit import CreateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .models import File

class EncryptedFileUploadHandler(MemoryFileUploadHandler):
    # Implement the custom file upload handler logic here
    pass

@method_decorator(csrf_exempt, name='dispatch')
class CreateEncryptedFile(CreateView):
    model = File
    fields = ["file"]

    def post(self, request, *args, **kwargs):
        request.upload_handlers = [
            EncryptedFileUploadHandler(request=request),
            MemoryFileUploadHandler(request=request),
            TemporaryFileUploadHandler(request=request)
        ]  
        return self._post(request)

    @method_decorator(csrf_protect)
    def _post(self, request):
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)
        
class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully. Redirect to upload page."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
