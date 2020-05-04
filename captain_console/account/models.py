from django.db import models
from histories.models import Search_history, Purchase_history

# Create your models here.
class Account(models.Model):
    name = models.CharField(max_length=255)
    profile_image = models.CharField(max_length=256)
    hashed_password = models.CharField(max_length=256)
    search_h_id = models.ForeignKey(Search_history, on_delete=models.CASCADE)
    purchase_h_id = models.ForeignKey(Purchase_history, on_delete=models.CASCADE)