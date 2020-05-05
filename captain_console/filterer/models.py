from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=999, blank=True)

    def __str__(self):
        return self.name
    