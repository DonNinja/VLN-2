from django.db import models
from product.models import Product
from django.conf import settings
from account.models import Account
# Create your models here.
class Search_history(models.Model):
    search = models.CharField(max_length=255)
    acc_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    # class Meta:
    #    ordering = ['-date']

class Purchase_history(models.Model):
    purchase = models.ForeignKey(Product, on_delete=models.CASCADE)
    acc_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, blank=True)
