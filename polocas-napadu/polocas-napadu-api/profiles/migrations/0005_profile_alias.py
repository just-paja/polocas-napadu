# Generated by Django 2.2.5 on 2019-09-14 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_auto_20190415_0053'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='alias',
            field=models.CharField(blank=True, help_text='artistAliasHelpText', max_length=63, null=True, verbose_name='Artist alias'),
        ),
    ]
