from django.db import models
from manufacturer.models import Manufacturer
from filterer.models import Category

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    image = models.CharField(max_length=999, blank=True)        # main image
    price = models.FloatField()
    on_sale = models.BooleanField()
    
    def __str__(self):
        return self.name
    

class Product_images(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_pic = models.CharField(max_length=999)

    def __str__(self):
        return "Image for " + self.product.name
    