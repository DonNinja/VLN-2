from django.db import models

# Create your models here.
class Search_history(models.Model):
    search = models.CharField(max_length=255)

class Purchase_history(models.Model):
    purchase = models.CharField(max_length=255)
