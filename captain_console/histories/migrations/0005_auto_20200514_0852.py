# Generated by Django 3.0.5 on 2020-05-14 08:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_image'),
        ('histories', '0004_auto_20200507_1205'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase_history',
            name='purchase',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.Product'),
        ),
    ]