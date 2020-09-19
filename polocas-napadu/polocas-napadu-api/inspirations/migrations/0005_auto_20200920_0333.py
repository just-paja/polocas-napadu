# Generated by Django 2.2.16 on 2020-09-20 01:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inspirations', '0004_retarget_shows'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspiration',
            name='show',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inspirations', to='shows.Show'),
        ),
    ]
