# Generated by Django 2.1.4 on 2018-12-08 14:05

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('shows', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShowPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('image', models.ImageField(height_field='height', upload_to='var/photos', width_field='width')),
                ('height', models.PositiveIntegerField(blank=True, default=100, editable=False, null=True)),
                ('width', models.PositiveIntegerField(blank=True, default=100, editable=False, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True, verbose_name='Description')),
                ('visibility', models.PositiveIntegerField(choices=[(1, 'Private'), (2, 'Public'), (3, 'Deleted')], default=2)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='shows.Show')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
