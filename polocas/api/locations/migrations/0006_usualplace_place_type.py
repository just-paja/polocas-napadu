# Generated by Django 2.2.5 on 2019-09-14 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("locations", "0005_usualplace"),
    ]

    operations = [
        migrations.AddField(
            model_name="usualplace",
            name="place_type",
            field=models.PositiveIntegerField(
                blank=True,
                choices=[(1, "homeStage")],
                null=True,
                verbose_name="Place type",
            ),
        ),
    ]