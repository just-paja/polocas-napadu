# Generated by Django 2.2 on 2019-05-16 08:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("voting", "0003_auto_20190516_0809"),
    ]

    operations = [
        migrations.RenameField(
            model_name="volumescrape", old_name="poll", new_name="voting",
        ),
    ]
