from django.db import models
from django.conf import settings


# Create your models here.
class Account(models.Model):
    
    profile_image = models.ImageField(upload_to="profile_image", default="def_prof.jpg")
    acc_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=150, default="John")
    last_name = models.CharField(max_length=150, default="Doe")


    def __str__(self):
        return self.acc_id.username
    