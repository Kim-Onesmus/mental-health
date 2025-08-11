from django.db import models

# Create your models here.
class Facility(models.Model):
    FACILITY_TYPES = [
        ('mental', 'Mental Health'),
        ('rehab', 'Rehabilitation'),
    ]

    name = models.CharField(max_length=100)
    lat = models.FloatField()
    lng = models.FloatField()
    type = models.CharField(max_length=10, choices=FACILITY_TYPES)
    county = models.CharField(max_length=50)
    subcounty = models.CharField(max_length=50)
    constituency = models.CharField(max_length=50)
    ward = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Facilities"