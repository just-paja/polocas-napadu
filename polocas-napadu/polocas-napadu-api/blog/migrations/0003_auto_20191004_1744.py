# Generated by Django 2.2.1 on 2019-10-04 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0002_auto_20191004_1739"),
    ]

    operations = [
        migrations.AlterField(
            model_name="article",
            name="site_anchor",
            field=models.CharField(
                blank=True,
                choices=[("history", "Group history")],
                max_length=31,
                null=True,
                unique=True,
                verbose_name="Site Anchor",
            ),
        ),
    ]
