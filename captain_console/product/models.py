from django.db import models
from manufacturer.models import Manufacturer

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.ForeignKey(Category)
    price = models.models.FloatField()
    on_sale = models.models.BooleanField()
    manufacturer = models.ForeignKey(Manufacturer)
