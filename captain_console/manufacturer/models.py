from django.db import models

# Create your models here.

class Manufacturer(models.Model):
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=999)
    description = models.CharField(max_length=999)

    def __str__(self):
        return self.name
    
