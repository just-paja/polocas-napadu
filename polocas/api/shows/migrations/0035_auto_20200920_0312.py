# Generated by Django 2.2.16 on 2020-09-20 01:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0034_auto_20200920_0249'),
        ('events', '0006_remove_event_show_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='show',
            old_name='show_type2',
            new_name='show_type',
        ),
    ]