# Generated by Django 3.0.5 on 2020-05-08 10:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_auto_20200506_1238'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='name',
        ),
    ]
