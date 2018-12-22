from django_extensions.db.fields import AutoSlugField
from django_extensions.db.models import TimeStampedModel
from django.db.models import CharField, ForeignKey, Model, TextField, PROTECT
from django.utils.translation import ugettext_lazy as _

from fields import NameMixin, VisibilityMixin


class Profile(NameMixin, TimeStampedModel, VisibilityMixin):
    slug = AutoSlugField(_('Slug'), populate_from='name')
    about = TextField()
    group = ForeignKey(
        'ProfileGroup',
        blank=True,
        null=True,
        on_delete=PROTECT,
    )