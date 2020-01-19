# Generated by Django 2.1.4 on 2018-12-22 13:41

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields
import fields.name
import fields.visibility


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("locations", "0001_initial"),
        ("bands", "0001_initial"),
        ("profiles", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="MatchResults",
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
                ("closed", models.BooleanField(default=False)),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="MatchScore",
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
                ("score", models.PositiveIntegerField(default=0)),
                ("penalty_points", models.PositiveIntegerField(default=0)),
                (
                    "results",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="score",
                        to="shows.MatchResults",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Show",
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
                ("all_day", models.BooleanField()),
                ("description", models.TextField()),
                ("end", models.DateTimeField()),
                ("name", models.CharField(max_length=50)),
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
                (
                    "location",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="locations.Location",
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
        migrations.CreateModel(
            name="ShowBand",
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
                    "type",
                    models.PositiveIntegerField(
                        choices=[(1, "team-home"), (1, "team-guest")]
                    ),
                ),
                (
                    "band",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="bands",
                        to="bands.Band",
                    ),
                ),
                (
                    "show",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="show_band",
                        to="shows.Show",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ShowParticipant",
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
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="showsParticipated",
                        to="profiles.Profile",
                    ),
                ),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ShowRole",
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
                ("name", fields.name.NameField(max_length=63)),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ShowType",
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
                ("name", models.CharField(max_length=50)),
                ("description", models.TextField()),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="showparticipant",
            name="role",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="showsParticipants",
                to="shows.ShowRole",
            ),
        ),
        migrations.AddField(
            model_name="showparticipant",
            name="show",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="showsParticipants",
                to="shows.Show",
            ),
        ),
        migrations.AddField(
            model_name="show",
            name="show_type",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="shows.ShowType"
            ),
        ),
        migrations.AddField(
            model_name="matchscore",
            name="show_band",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="score",
                to="shows.ShowBand",
            ),
        ),
        migrations.AddField(
            model_name="matchresults",
            name="show",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="match_results",
                to="shows.Show",
            ),
        ),
        migrations.CreateModel(
            name="ShowPhoto",
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
                    "image",
                    models.ImageField(
                        height_field="height",
                        upload_to="var/photos",
                        width_field="width",
                    ),
                ),
                (
                    "height",
                    models.PositiveIntegerField(
                        blank=True, default=100, editable=False, null=True
                    ),
                ),
                (
                    "width",
                    models.PositiveIntegerField(
                        blank=True, default=100, editable=False, null=True
                    ),
                ),
                (
                    "description",
                    models.CharField(
                        blank=True,
                        max_length=255,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
                (
                    "visibility",
                    fields.visibility.VisibilityField(
                        choices=[(1, "Private"), (2, "Public"), (3, "Deleted")],
                        default=2,
                    ),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="photos",
                        to="shows.Show",
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
        migrations.CreateModel(
            name="ShowTypePhoto",
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
                    "image",
                    models.ImageField(
                        height_field="height",
                        upload_to="var/photos",
                        width_field="width",
                    ),
                ),
                (
                    "height",
                    models.PositiveIntegerField(
                        blank=True, default=100, editable=False, null=True
                    ),
                ),
                (
                    "width",
                    models.PositiveIntegerField(
                        blank=True, default=100, editable=False, null=True
                    ),
                ),
                (
                    "description",
                    models.CharField(
                        blank=True,
                        max_length=255,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
                (
                    "visibility",
                    fields.visibility.VisibilityField(
                        choices=[(1, "Private"), (2, "Public"), (3, "Deleted")],
                        default=2,
                    ),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="photos",
                        to="shows.ShowType",
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
        migrations.AlterField(
            model_name="show", name="all_day", field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="show",
            name="end",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="show",
            name="visibility",
            field=fields.visibility.VisibilityField(
                choices=[(1, "Private"), (2, "Public"), (3, "Deleted")], default=2
            ),
        ),
        migrations.AddField(
            model_name="showtype",
            name="visibility",
            field=fields.visibility.VisibilityField(
                choices=[(1, "Private"), (2, "Public"), (3, "Deleted")], default=2
            ),
        ),
        migrations.AlterModelOptions(name="showtype", options={},),
        migrations.AlterField(
            model_name="show", name="name", field=fields.name.NameField(max_length=63),
        ),
        migrations.AlterField(
            model_name="showtype",
            name="name",
            field=fields.name.NameField(max_length=63),
        ),
    ]
