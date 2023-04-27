# Generated by Django 2.1.5 on 2019-02-04 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("theatre_sports", "0008_auto_20190203_2005"),
    ]

    operations = [
        migrations.AlterField(
            model_name="foul",
            name="comment",
            field=models.TextField(
                blank=True,
                help_text="Describe what was the foul play",
                verbose_name="Comment",
            ),
        ),
    ]