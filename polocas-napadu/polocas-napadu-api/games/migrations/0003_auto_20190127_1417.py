# Generated by Django 3.0.dev20190119234541 on 2019-01-27 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inspirations', '0003_auto_20190126_1402'),
        ('games', '0002_auto_20190126_1557'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='inspirations',
            field=models.ManyToManyField(related_name='inspiration_games', to='inspirations.Inspiration'),
        ),
        migrations.DeleteModel(
            name='GameInspiration',
        ),
    ]