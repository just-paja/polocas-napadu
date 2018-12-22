# Generated by Django 2.1.4 on 2018-12-22 13:40

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields
import fields.name
import fields.visibility


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('address', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('gps', models.CharField(blank=True, max_length=127, null=True)),
                ('name', models.CharField(max_length=63)),
                ('website', models.URLField(blank=True, null=True)),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LocationPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('image', models.ImageField(height_field='height', upload_to='var/photos', width_field='width')),
                ('height', models.PositiveIntegerField(blank=True, default=100, editable=False, null=True)),
                ('width', models.PositiveIntegerField(blank=True, default=100, editable=False, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True, verbose_name='Description')),
                ('visibility', fields.visibility.VisibilityField(choices=[(1, 'Private'), (2, 'Public'), (3, 'Deleted')], default=2)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='locations.Location')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='location',
            name='visibility',
            field=fields.visibility.VisibilityField(choices=[(1, 'Private'), (2, 'Public'), (3, 'Deleted')], default=2),
        ),
        migrations.AlterModelOptions(
            name='location',
            options={},
        ),
        migrations.AlterField(
            model_name='location',
            name='name',
            field=fields.name.NameField(max_length=63),
        ),
    ]