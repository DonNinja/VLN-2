from django.db import models

# Create your models here.

class Search_history(models.Model):
    search = models.CharField(_(""), max_length=255)

class Purchase_history(models.Model):
    purchase = models.Charfield(_(""), max_length=255)


class Account(models.Model):
    name = models.CharField(max_length=255)
    profile_image = models.CharField(_("image link"), max_length=256)
    hashed_password = models.CharField(_("Hashed passwords"), max_length=256)
    search_h_id = models.models.ForeignKey(Search_history, on_delete=models.CASCADE)
    purchase_h_id = models.ForeignKey(Purchase_history, on_delete=models.CASCADE)


class Manufacturer(models.Model):
    name = models.CharField(_(""), max_length=255)
    image = models.CharField(_(""), max_length=999)

class Category(models.Model):
    name = models.CharField(_(""), max_length=50)


class Product(models.Model):
    name = models.CharField(_(""), max_length=255)
    description = models.CharField(_(""), max_length=255)
    category = models.ForeignKey(Category)
    price = models.models.FloatField(_(""))
    on_sale = models.models.BooleanField(_(""))
    manufacturer = models.ForeignKey(Manufacturer)



