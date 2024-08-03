from rest_framework import serializers
from .models import *
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model=File
        fields='__all__'
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'confirm_password', 'phone', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            phone=validated_data['phone'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user