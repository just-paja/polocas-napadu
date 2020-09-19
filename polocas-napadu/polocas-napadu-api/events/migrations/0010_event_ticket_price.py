# Generated by Django 2.2.16 on 2020-09-20 13:05

import accounting.models.currency
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounting', '0010_auto_20200826_1000'),
        ('events', '0009_update_content_types'),
    ]

    state_operations = [
        migrations.CreateModel(
            name='EventTicketPrice',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID'
                    )
                ),
                (
                    'amount',
                    accounting.models.currency.AmountField(
                        decimal_places=2,
                        default=0,
                        max_digits=19,
                        verbose_name='Amount'
                    )
                ),
                (
                    'currency',
                    accounting.models.currency.CurrencyField(
                        choices=[('CZK', 'CZK'), ('EUR', 'EUR'), ('USD', 'USD')],
                        default='CZK',
                        help_text='ISO 4217 defined three letter currency abbreviation',
                        max_length=3,
                        verbose_name='Currency'
                    )
                ),
                (
                    'price_level',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name='event_ticket_prices',
                        to='accounting.PriceLevel',
                        verbose_name='Price level'
                    )
                ),
                (
                    'show',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='ticket_prices',
                        to='events.Event',
                        verbose_name='Show'
                    )
                ),
            ],
        ),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(state_operations=state_operations),
    ]
