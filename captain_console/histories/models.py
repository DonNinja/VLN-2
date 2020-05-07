from django.db import models
from account.models import Account
# Create your models here.
class Search_history(models.Model):
    search = models.CharField(max_length=255)
    profile_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, blank=True)

class Purchase_history(models.Model):
    purchase = models.CharField(max_length=255)
    profile_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, blank=True)
