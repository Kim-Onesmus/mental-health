from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Facility

class FacilityResource(resources.ModelResource):
    class Meta:
        model = Facility

@admin.register(Facility)
class FacilityAdmin(ImportExportModelAdmin):
    resource_class = FacilityResource
    list_display = ('name', 'type', 'county', 'subcounty', 'constituency', 'ward')
    list_filter = ('type', 'county', 'subcounty')
    search_fields = ('name', 'county', 'subcounty', 'constituency', 'ward')
