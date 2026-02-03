from django.shortcuts import render
from django.http import JsonResponse
from .models import HealthcareFacility

def facilities_map_data(request):
    facilities = HealthcareFacility.objects.all()

    data = []
    for f in facilities:
        data.append({
            "id": str(f.id),  # UUID
            "name": f.name,
            "lat": float(f.latitude),
            "lng": float(f.longitude),
            "type": f.facility_type,  # mental_health / rehab
            "operating_time": f.operating_time,
            "patient_care_setting": f.patient_care_setting,
            "modes_of_payment": f.modes_of_payment,
            "insurance_accepted": f.insurance_accepted,
            "operating_days": f.operating_days,

            # Optional (add later if you store them)
            "county": "Kisumu",
            "subcounty": "Kisumu Central",
            "constituency": "Kisumu Central",
            "ward": "Unknown",
        })

    return JsonResponse(data, safe=False)

def Index(request):
    return render(request, 'app/home.html')