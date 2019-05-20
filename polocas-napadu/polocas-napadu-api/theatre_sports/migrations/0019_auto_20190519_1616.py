# Generated by Django 2.2 on 2019-05-19 16:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('theatre_sports', '0018_scorepointpoll_closed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scorepointpoll',
            name='stage',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='score_point_polls', to='theatre_sports.MatchStage', verbose_name='Match Stage'),
        ),
    ]