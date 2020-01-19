# Generated by Django 2.2 on 2019-04-17 13:46

import colorfield.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("theatre_sports", "0014_foultype_visibility"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contestantgroup",
            name="band",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="contestant_groups",
                to="bands.Band",
                verbose_name="Band",
            ),
        ),
        migrations.AlterField(
            model_name="contestantgroup",
            name="color",
            field=colorfield.fields.ColorField(
                default="#ccc", max_length=18, verbose_name="Color"
            ),
        ),
        migrations.AlterField(
            model_name="contestantgroup",
            name="contestant_type",
            field=models.PositiveIntegerField(
                choices=[(1, "team-home"), (2, "team-guest")],
                verbose_name="Contestant Type",
            ),
        ),
        migrations.AlterField(
            model_name="contestantgroup",
            name="match",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="contestant_groups",
                to="theatre_sports.Match",
                verbose_name="Match",
            ),
        ),
        migrations.AlterField(
            model_name="contestantgroup",
            name="players",
            field=models.ManyToManyField(
                related_name="contestant_groups",
                to="shows.ShowParticipant",
                verbose_name="Players",
            ),
        ),
        migrations.AlterField(
            model_name="foul",
            name="contestant_group",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="fouls",
                to="theatre_sports.ContestantGroup",
                verbose_name="Contestant",
            ),
        ),
        migrations.AlterField(
            model_name="foul",
            name="foul_type",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="fouls",
                to="theatre_sports.FoulType",
                verbose_name="Foul type",
            ),
        ),
        migrations.AlterField(
            model_name="foul",
            name="game",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="fouls",
                to="games.Game",
                verbose_name="Game",
            ),
        ),
        migrations.AlterField(
            model_name="foul",
            name="player",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="fouls",
                to="shows.ShowParticipant",
                verbose_name="Player",
            ),
        ),
        migrations.AlterField(
            model_name="match",
            name="closed",
            field=models.BooleanField(default=False, verbose_name="Closed"),
        ),
        migrations.AlterField(
            model_name="matchstage",
            name="game",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="stages",
                to="games.Game",
                verbose_name="Game",
            ),
        ),
        migrations.AlterField(
            model_name="matchstage",
            name="inspirations",
            field=models.ManyToManyField(
                blank=True,
                related_name="stages",
                to="inspirations.Inspiration",
                verbose_name="Inspirations",
            ),
        ),
        migrations.AlterField(
            model_name="matchstage",
            name="match",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="stages",
                to="theatre_sports.Match",
                verbose_name="Match",
            ),
        ),
        migrations.AlterField(
            model_name="matchstage",
            name="type",
            field=models.PositiveIntegerField(
                choices=[
                    (1, "stage-show-setup"),
                    (2, "stage-intro"),
                    (3, "stage-game-setup"),
                    (4, "stage-game"),
                    (5, "stage-voting"),
                    (6, "stage-game-results"),
                    (7, "stage-pause"),
                    (8, "stage-finale"),
                ],
                verbose_name="Stage Type",
            ),
        ),
    ]
