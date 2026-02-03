from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import HealthcareFacility

class HealthcareFacilityResource(resources.ModelResource):
    class Meta:
        model = HealthcareFacility
        import_id_fields = ('name',)  # prevents duplicates
        fields = (
            'name',
            'facility_type',
            'latitude',
            'longitude',
            'operating_time',
            'patient_care_setting',
            'modes_of_payment',
            'insurance_accepted',
            'operating_days',
        )


@admin.register(HealthcareFacility)
class HealthcareFacilityAdmin(ImportExportModelAdmin):
    resource_class = HealthcareFacilityResource

    list_display = (
        'name',
        'facility_type',
        'patient_care_setting',
        'operating_days',
    )

    list_filter = (
        'facility_type',
        'patient_care_setting',
    )

    search_fields = (
        'name',
        'modes_of_payment',
        'insurance_accepted',
    )

    ordering = ('name',)
