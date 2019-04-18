from fields.admin import BaseAdminModel, BaseInlineAdminModel

from .models import Location, LocationPhoto, UsualPlace


class LocationPhotoAdmin(BaseInlineAdminModel):
    """Admin model for location photos."""

    model = LocationPhoto


class LocationAdmin(BaseAdminModel):
    """Admin model for locations."""

    model = Location
    inlines = [
        LocationPhotoAdmin,
    ]
    list_display = ('name', 'address', 'website', 'visibility')
    list_filter = ('visibility',)
    search_fields = ('name', 'address')
    fields = (
        'name',
        'address',
        'visibility',
        'gps',
        'website',
        'description',
    )


class UsualPlaceAdmin(BaseAdminModel):

    model = UsualPlace
    list_display = (
        'name',
        'get_location_name',
        'visibility',
    )
    list_filter = ('visibility',)
    search_fields = (
        'name',
        'location__name',
        'location__address',
    )
    autocomplete_fields = ('location',)
    fields = ('name', 'location', 'visibility', 'description')
