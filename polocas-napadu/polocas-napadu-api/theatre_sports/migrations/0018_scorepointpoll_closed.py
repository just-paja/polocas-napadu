# Generated by Django 2.2 on 2019-05-16 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theatre_sports', '0017_auto_20190515_1735'),
    ]

    operations = [
        migrations.AddField(
            model_name='scorepointpoll',
            name='closed',
            field=models.BooleanField(default=False, verbose_name='Closed'),
        ),
    ]
