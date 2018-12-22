from shows.models import (
    MatchScore,
    ShowBand,
    ShowParticipant,
    ShowPhoto,
    ShowTypePhoto,
)

from .base import BaseAdminModel, BaseInlineAdminModel


class ShowPhotoAdmin(BaseInlineAdminModel):
    """Admin model for show photos."""

    model = ShowPhoto


class ShowTypePhotoAdmin(BaseInlineAdminModel):
    """Admin model for show photos."""

    model = ShowTypePhoto


class ShowParticipantAdmin(BaseInlineAdminModel):
    """Admin model for show photos."""

    model = ShowParticipant


class ShowBandAdmin(BaseInlineAdminModel):
    """Admin model for show photos."""

    model = ShowBand


class MatchScoreAdmin(BaseInlineAdminModel):
    """Admin model for shows."""

    model = MatchScore


class MatchResultsAdmin(BaseAdminModel):
    """Admin model for shows."""

    inlines = [
        MatchScoreAdmin,
    ]
    search_fields = ('show__name',)


class ShowAdmin(BaseAdminModel):
    """Admin model for shows."""

    inlines = [
        ShowBandAdmin,
        ShowParticipantAdmin,
        ShowPhotoAdmin,
    ]
    search_fields = ('name',)


class ShowRoleAdmin(BaseAdminModel):
    """Admin model for show roles."""
    search_fields = ('name',)


class ShowTypeAdmin(BaseAdminModel):
    """Admin model for show types."""

    inlines = [
        ShowTypePhotoAdmin,
    ]
    search_fields = ('name',)