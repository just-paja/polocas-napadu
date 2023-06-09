from django.db.models import ManyToManyField
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import TimeStampedModel

from fields import DescriptionMixin, NameMixin


class Purpose(
    TimeStampedModel,
    NameMixin,
    DescriptionMixin,
):
    class Meta:
        verbose_name = _('Purpose')
        verbose_name_plural = _('Purposes')

    def get_promise_count(self):
        return self.promises.count()


class PurposeCategory(
    TimeStampedModel,
    NameMixin,
    DescriptionMixin,
):
    class Meta:
        verbose_name = _('Purpose category')
        verbose_name_plural = _('Purpose categories')

    purposes = ManyToManyField(
        'Purpose',
        blank=True,
        related_name='categories',
    )
