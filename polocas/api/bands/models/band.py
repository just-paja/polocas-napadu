from django_extensions.db.models import TimeStampedModel
from django.db.models import CharField, URLField
from django.utils.translation import gettext_lazy as _

from fields import NameMixin, VisibilityMixin
from images.fields import ImageField


class Band(TimeStampedModel, NameMixin, VisibilityMixin):
    class Meta:
        verbose_name = _("Band")
        verbose_name_plural = _("Bands")

    city = CharField(max_length=127)
    website = URLField(blank=True, null=True)
    logo = ImageField(upload_to="bands", blank=True, null=True)
