from django.db import models
from django.conf import settings
from product.models import Product

# Create your models here.

class Cart(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    acc_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
