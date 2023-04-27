# Generated by Django 2.2.dev20190104142447 on 2019-01-13 18:00

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields
import fields.name
import fields.visibility


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("locations", "0002_auto_20190112_1615"),
        ("shows", "0003_auto_20190113_1759"),
        ("bands", "0002_auto_20190112_1615"),
        ("games", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContestantGroup",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "contestant_type",
                    models.PositiveIntegerField(
                        choices=[(1, "team-home"), (1, "team-guest")]
                    ),
                ),
                (
                    "band",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="contestant_groups",
                        to="bands.Band",
                    ),
                ),
            ],
            options={"verbose_name": "Match", "verbose_name_plural": "Matches",},
        ),
        migrations.CreateModel(
            name="Match",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    django_extensions.db.fields.CreationDateTimeField(
                        auto_now_add=True, verbose_name="created"
                    ),
                ),
                (
                    "modified",
                    django_extensions.db.fields.ModificationDateTimeField(
                        auto_now=True, verbose_name="modified"
                    ),
                ),
                (
                    "name",
                    fields.name.NameField(
                        help_text="nameHelpText", max_length=63, verbose_name="Name"
                    ),
                ),
                (
                    "visibility",
                    fields.visibility.VisibilityField(
                        choices=[(1, "Private"), (2, "Public"), (3, "Deleted")],
                        default=2,
                        help_text="visibilityHelpText",
                        verbose_name="Visibility",
                    ),
                ),
                (
                    "slug",
                    django_extensions.db.fields.AutoSlugField(
                        blank=True,
                        editable=False,
                        populate_from="name",
                        verbose_name="Slug",
                    ),
                ),
                ("start", models.DateTimeField()),
                ("end", models.DateTimeField(blank=True, null=True)),
                ("all_day", models.BooleanField(default=False)),
                ("description", models.TextField()),
                ("closed", models.BooleanField(default=False)),
                (
                    "location",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="locations.Location",
                    ),
                ),
                (
                    "show",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="match",
                        to="shows.Show",
                    ),
                ),
            ],
            options={"verbose_name": "Match", "verbose_name_plural": "Matches",},
        ),
        migrations.CreateModel(
            name="ScorePoint",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    django_extensions.db.fields.CreationDateTimeField(
                        auto_now_add=True, verbose_name="created"
                    ),
                ),
                (
                    "modified",
                    django_extensions.db.fields.ModificationDateTimeField(
                        auto_now=True, verbose_name="modified"
                    ),
                ),
                (
                    "contestant_group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="score_points",
                        to="theatre_sports.ContestantGroup",
                    ),
                ),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="score_points",
                        to="games.Game",
                    ),
                ),
                (
                    "match",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="score_points",
                        to="theatre_sports.Match",
                    ),
                ),
            ],
            options={
                "verbose_name": "ScorePoint",
                "verbose_name_plural": "ScorePoints",
            },
        ),
        migrations.CreateModel(
            name="Foul",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    django_extensions.db.fields.CreationDateTimeField(
                        auto_now_add=True, verbose_name="created"
                    ),
                ),
                (
                    "modified",
                    django_extensions.db.fields.ModificationDateTimeField(
                        auto_now=True, verbose_name="modified"
                    ),
                ),
                (
                    "comment",
                    models.TextField(
                        help_text="Enter words that will serve as an inspiration for this improvisation",
                        max_length=255,
                        verbose_name="Textual inspiration",
                    ),
                ),
                (
                    "contestant_group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="fouls",
                        to="theatre_sports.ContestantGroup",
                    ),
                ),
                (
                    "game",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="fouls",
                        to="games.Game",
                    ),
                ),
                (
                    "match",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="fouls",
                        to="theatre_sports.Match",
                    ),
                ),
            ],
            options={"verbose_name": "Foul", "verbose_name_plural": "Fouls",},
        ),
        migrations.AddField(
            model_name="contestantgroup",
            name="match",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="contestant_groups",
                to="theatre_sports.Match",
            ),
        ),
        migrations.AddField(
            model_name="contestantgroup",
            name="players",
            field=models.ManyToManyField(
                related_name="contestant_groups", to="shows.ShowParticipant"
            ),
        ),
    ]