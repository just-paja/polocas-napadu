# Generated by Django 2.2.7 on 2019-11-25 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shows", "0015_auto_20191029_0832"),
    ]

    operations = [
        migrations.AddField(
            model_name="showtype",
            name="use_fouls",
            field=models.BooleanField(default=False, verbose_name="Use fouls"),
        ),
    ]
