# Generated by Django 2.2 on 2019-04-15 00:30

from django.db import migrations
import fields.description


class Migration(migrations.Migration):

    dependencies = [
        ('theatre_sports', '0012_auto_20190415_0024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foultype',
            name='description',
            field=fields.description.DescriptionField(help_text='nameDescriptionText', verbose_name='Description'),
        ),
    ]
