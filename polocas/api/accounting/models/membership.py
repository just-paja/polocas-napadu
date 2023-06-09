import datetime

from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models import ForeignKey, CASCADE, PROTECT
from django.utils.translation import gettext_lazy as _

from fields import NameMixin, DescriptionMixin
from emailing.models import EmailNotification

from .currency import AmountField, CurrencyField
from .promise import Promise, RECURRENCE_MONTHLY, STATUS_OVERPAID, STATUS_UNDERPAID
from .statement import Statement, statement_registered
from .time_limited import (
    intersects,
    later,
    sooner,
    TimeFilteredModel,
    TimeLimitedManager,
    TimeLimitedModel,
)

MEMBERSHIP_NAME_IDENTIFIER = 'Členství'


def format_membership_name(user):
    return '%s: %s' % (
        MEMBERSHIP_NAME_IDENTIFIER,
        user.get_full_name() or user.username
    )


class Membership(TimeFilteredModel):

    class Meta:
        verbose_name = _('Membership')
        verbose_name_plural = _('Memberships')

    objects = TimeLimitedManager()
    level = ForeignKey(
        'MembershipLevel',
        on_delete=PROTECT,
        related_name='memberships',
        verbose_name=_('Membership level'),
    )
    user = ForeignKey(
        get_user_model(),
        on_delete=PROTECT,
        related_name='memberships',
        verbose_name=_('Member'),
    )

    def __str__(self):
        return format_membership_name(self.user)

    def get_related_objects(self):
        return super().get_related_objects().filter(user=self.user)

    def get_current_promise(self):
        return self.fees.get_active().first()

    def how_many_days(self):
        return (datetime.date.today() - self.start).days

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_fees()

    def update_fees(self):
        level_fees = MembershipLevelFee.objects.filter(level=self.level).order_by('start').all()
        for level_fee in level_fees:
            if intersects(level_fee, self):
                fee = self.fees.filter(level_fee=level_fee).first() or MembershipFee()
                fee.amount = level_fee.amount
                fee.currency = level_fee.currency
                fee.end = sooner(self.end, level_fee.end)
                fee.level_fee = level_fee
                fee.membership = self
                fee.start = later(self.start, level_fee.start)
                fee.save()
            else:
                fees = self.fees.filter(level_fee=level_fee)
                for fee in fees:
                    fee.delete()


class MembershipLevel(NameMixin, DescriptionMixin, TimeLimitedModel):

    class Meta:
        verbose_name = _('Membership level')
        verbose_name_plural = _('Membership levels')

    objects = TimeLimitedManager()

    def __str__(self):
        return str(self.name)


class MembershipLevelFee(TimeFilteredModel):

    class Meta:
        verbose_name = _('Membership level fee')
        verbose_name_plural = _('Membership level fees')

    objects = TimeLimitedManager()
    level = ForeignKey(
        'MembershipLevel',
        on_delete=CASCADE,
        verbose_name=_('Membership type'),
    )
    amount = AmountField()
    currency = CurrencyField()

    def __str__(self):
        return '%s %s (%s)' % (self.amount, self.currency, self.level.name)

    def get_related_objects(self):
        return super().get_related_objects().filter(level=self.level)


class MembershipFee(Promise, TimeFilteredModel):

    class Meta:
        verbose_name = _('Membership fee')
        verbose_name_plural = _('Membership fees')

    membership = ForeignKey(
        'Membership',
        on_delete=CASCADE,
        related_name='fees',
    )
    level_fee = ForeignKey(
        'MembershipLevelFee',
        on_delete=PROTECT,
        related_name='fees',
    )

    def save(self, *args, **kwargs):
        self.repeat = RECURRENCE_MONTHLY
        self.name = '%s (%s)' % (
            format_membership_name(self.membership.user),
            self.level_fee.level.name,
        )
        if not self.variable_symbol:
            self.variable_symbol = self.pk
        super().save(*args, **kwargs)

    def get_related_objects(self):
        return super().get_related_objects().filter(membership__user=self.membership.user)


def format_amount(amount, currency):
    return '%s %s' % (amount, currency)


@receiver(statement_registered, sender=Statement)
def acknowledge_membership_contribution(instance, update_fields=None, **kwargs):
    statement = instance
    if statement.initial_promise:
        return
    promise = statement.promise
    if not promise:
        return
    try:
        membership_fee = promise.membershipfee
    except MembershipFee.DoesNotExist:
        return
    if not membership_fee:
        return
    membership = membership_fee.membership
    user = membership.user
    amount_diff = abs(promise.get_amount_diff())
    context = {
        'amount_diff': format_amount(amount_diff, promise.currency),
        'amount': format_amount(statement.amount, statement.currency),
        'date': statement.received_at,
        'membership_days': membership.how_many_days(),
        'overpaid': promise.status == STATUS_OVERPAID,
        'underpaid': promise.status == STATUS_UNDERPAID,
        'variable_symbol': promise.variable_symbol,
    }
    EmailNotification.schedule(
        key='membership_fee_thanks',
        template='membership/thanks_for_payment.html',
        recipient_email=user.email,
        subject=_('Accepted membership contribution'),
        ready=True,
        **context,
    )
