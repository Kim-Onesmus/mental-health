from django.db import models
import uuid

class HealthcareFacility(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(max_length=255)
    FACILITY_TYPE_CHOICES = [
            ('mental_health', 'Mental Health'),
            ('rehab', 'Rehabilitation'),
        ]

    facility_type = models.CharField(
        max_length=100,
        choices=FACILITY_TYPE_CHOICES,
        help_text="Type of healthcare facility"
    )
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    operating_time = models.CharField(
        max_length=100,
        help_text="e.g. 8:00 AM - 5:00 PM"
    )

    PATIENT_CARE_CHOICES = [
        ('Inpatient', 'Inpatient'),
        ('Outpatient', 'Outpatient'),
        ('Inpatient, Outpatient', 'Inpatient and Outpatient'),
    ]
    patient_care_setting = models.CharField(
        max_length=100,
        choices=PATIENT_CARE_CHOICES
    )

    modes_of_payment = models.CharField(
        max_length=255,
        help_text="e.g. Cash, M-Pesa, Card"
    )

    insurance_accepted = models.TextField(
        help_text="List of accepted insurance providers"
    )

    operating_days = models.CharField(
        max_length=100,
        help_text="e.g. Monday - Friday"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Healthcare Facility"
        verbose_name_plural = "Healthcare Facilities"