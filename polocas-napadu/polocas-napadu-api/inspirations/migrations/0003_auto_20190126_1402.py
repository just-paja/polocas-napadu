# Generated by Django 3.0.dev20190119234541 on 2019-01-26 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("inspirations", "0002_inspiration_discarded"),
    ]

    operations = [
        migrations.RemoveField(model_name="inspiration", name="all_day",),
        migrations.RemoveField(model_name="inspiration", name="description",),
        migrations.RemoveField(model_name="inspiration", name="end",),
        migrations.RemoveField(model_name="inspiration", name="location",),
        migrations.RemoveField(model_name="inspiration", name="name",),
        migrations.RemoveField(model_name="inspiration", name="slug",),
        migrations.RemoveField(model_name="inspiration", name="start",),
        migrations.RemoveField(model_name="inspiration", name="visibility",),
        migrations.AlterField(
            model_name="inspiration",
            name="show",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inspirations",
                to="shows.Show",
            ),
        ),
    ]
