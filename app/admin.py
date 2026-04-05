from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import (
    Facility,
    Organization,
)


@admin.register(Organization)
class OrganizationAdmin(UserAdmin):
    model = Organization
    ordering = ("-date_joined",)
    list_display = (
        "email",
        "org_name",
        "status",
        "is_active",
        "is_staff",
        "date_joined",
    )
    list_filter = (
        "status",
        "is_active",
        "is_staff",
        "is_superuser",
        "date_joined",
    )
    search_fields = (
        "email",
        "org_name",
        "contact_person",
        "correspondence_email",
        "correspondence_phone",
    )
    readonly_fields = ("last_login", "date_joined", "updated_at")

    fieldsets = (
        ("Authentication", {"fields": ("email", "password")}),
        ("Organization Profile", {"fields": ("org_name", "status", "rejection_reason", "reviewed_at", "reviewed_by")}),
        (
            "Contact Details",
            {
                "fields": (
                    "contact_person",
                    "correspondence_phone",
                    "correspondence_email",
                    "logo",
                )
            },
        ),
        (
            "Discovery",
            {"fields": ("hear_about_us", "hear_about_us_other")},
        ),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Important Dates", {"fields": ("last_login", "date_joined", "updated_at")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "org_name",
                    "password1",
                    "password2",
                    "contact_person",
                    "correspondence_phone",
                    "correspondence_email",
                    "hear_about_us",
                    "hear_about_us_other",
                    "status",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "organization",
        "county",
        "sub_county",
        "status",
        "advertise_tier",
        "submitted_at",
        "updated_at",
    )
    list_filter = (
        "status",
        "advertise_tier",
        "registration_status",
        "org_type",
        "funding_source",
        "is_youth_org",
        "is_disability_org",
        "is_female_led",
        "submitted_at",
        "updated_at",
    )
    search_fields = (
        "name",
        "organization__org_name",
        "organization__email",
        "county",
        "sub_county",
        "public_email",
    )
    autocomplete_fields = ("organization", "reviewed_by")
    readonly_fields = ("submitted_at", "updated_at")

    fieldsets = (
        ("Owner", {"fields": ("organization",)}),
        (
            "Step 1 - Basic Information",
            {
                "fields": (
                    "name",
                    "public_email",
                    "contact_number_1",
                    "contact_number_2",
                    "contact_number_3",
                    "year_founded",
                    "registration_status",
                    "year_formally_registered",
                    "country_of_registration",
                    "logo",
                )
            },
        ),
        (
            "Step 2 - Online Presence",
            {
                "fields": (
                    "website",
                    "twitter",
                    "facebook",
                    "whatsapp",
                    "linkedin",
                    "instagram",
                    "tiktok",
                )
            },
        ),
        (
            "Step 3 - Classification",
            {
                "fields": (
                    "org_type",
                    "county",
                    "sub_county",
                    "funding_source",
                    "is_youth_org",
                    "youth_type",
                    "is_disability_org",
                    "is_female_led",
                    "areas_of_intervention",
                )
            },
        ),
        (
            "Step 4 - Mental Health Focus",
            {
                "fields": (
                    "mh_focus_areas",
                    "mh_service_categories",
                )
            },
        ),
        (
            "Step 5 - Achievements and Advertising",
            {
                "fields": (
                    "achievements",
                    "persons_reached",
                    "mh_funding_used_kes",
                    "advertise_tier",
                )
            },
        ),
        (
            "Map Coordinates",
            {
                "fields": (
                    "latitude",
                    "longitude",
                )
            },
        ),
        (
            "Review Workflow",
            {
                "fields": (
                    "status",
                    "rejection_reason",
                    "reviewed_at",
                    "reviewed_by",
                )
            },
        ),
        (
            "Documents",
            {
                "fields": (
                    "registration_certificate",
                )
            },
        ),
        ("Timestamps", {"fields": ("submitted_at", "updated_at")}),
    )
