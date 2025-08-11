from django.contrib import admin
from .models import Facility

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'county', 'subcounty', 'constituency', 'ward')
    list_filter = ('type', 'county', 'subcounty')
    search_fields = ('name', 'county', 'subcounty', 'constituency', 'ward')
