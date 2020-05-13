# Generated by Django 3.0.5 on 2020-05-13 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_image'),
        ('reviews', '0003_review_connector'),
    ]

    operations = [
        migrations.AddField(
            model_name='review_connector',
            name='product_id',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='product.Product'),
            preserve_default=False,
        ),
    ]
