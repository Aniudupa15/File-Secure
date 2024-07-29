from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        decrypted_file = instance.get_decrypted_file()
        representation['file'] = decrypted_file.decode('utf-8', errors='ignore')  # Ensure file content is human-readable
        return representation
