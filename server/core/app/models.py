from django.db import models
from cryptography.fernet import Fernet
import os

class File(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Encrypt file before saving
        if self.file and not self._state.adding:
            key = os.getenv('ENCRYPTION_KEY')
            cipher = Fernet(key)
            encrypted_data = cipher.encrypt(self.file.read())
            self.file.save(self.file.name, ContentFile(encrypted_data), save=False)
        super().save(*args, **kwargs)

    def get_decrypted_file(self):
        # Decrypt file before returning
        key = os.getenv('ENCRYPTION_KEY')
        cipher = Fernet(key)
        self.file.seek(0)  # Ensure we're at the start of the file
        decrypted_data = cipher.decrypt(self.file.read())
        return decrypted_data
