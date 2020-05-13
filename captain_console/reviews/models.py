from django.db import models
from account.models import Account
from product.models import Product
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from product.models import Product

# Create your models here.

class Review(models.Model):
    acc_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    text = models.CharField(max_length=999)
    grade = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    

class Review_Connector(models.Model):
    acc_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    profile_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE)

    

