from django.db.models import BooleanField
from django.utils.translation import ugettext_lazy as _

from fields import PublicResourceMixin, WeightedMixin


class PriceLevel(PublicResourceMixin, WeightedMixin):
    is_default = BooleanField(
        verbose_name=_('Default price level that will be used as fallback'),
    )

    def clean(self):
        if self.is_default:
            clashing = self.__class__.objects.filter(
                is_default=True
            ).exclude(pk=self.pk).all()
            for level in clashing:
                level.is_default = False
                level.save()
