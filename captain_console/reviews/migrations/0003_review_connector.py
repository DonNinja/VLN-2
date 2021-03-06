# Generated by Django 3.0.5 on 2020-05-13 14:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0011_auto_20200513_1118'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('reviews', '0002_auto_20200508_1601'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review_Connector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('acc_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('profile_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.Account')),
                ('review_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.Review')),
            ],
        ),
    ]
