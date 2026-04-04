from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.http import require_POST
from .forms import OrganizationLoginForm, OrganizationRegistrationForm
from .models import AdvertiseTier, Facility, RegistrationStatus
from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Facility, Organization


# ─────────────────────────────────────────────
#  REGISTER
# ─────────────────────────────────────────────

def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    login_data = {"email": ""}

    if request.method == 'POST':
        registration_form = OrganizationRegistrationForm(request.POST)
        if registration_form.is_valid():
            org = registration_form.save(commit=False)
            org.email = org.email.lower()
            org.correspondence_email = org.correspondence_email.lower()
            org.status = RegistrationStatus.PENDING
            org.set_password(registration_form.cleaned_data["password"])
            org.save()

            messages.success(
                request,
                f"Thank you, {org.org_name}! Your registration has been submitted. "
                "The IDL team will review your application and notify you by email.",
            )
            return redirect('login')

        messages.error(request, "Please correct the registration errors below.")
        return render(
            request,
            'app/auth.html',
            {
                'active_tab': 'register',
                'registration_form': registration_form,
                'login_data': login_data,
            },
        )

    return render(
        request,
        'app/auth.html',
        {
            'active_tab': 'register',
            'registration_form': OrganizationRegistrationForm(),
            'login_data': login_data,
        },
    )


# ─────────────────────────────────────────────
#  LOGIN
# ─────────────────────────────────────────────

def login_view(request):
    organizations = Organization.objects.filter(status=RegistrationStatus.APPROVED).count()
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = OrganizationLoginForm(request.POST)
        if form.is_valid():
            login(request, form.cleaned_data["user"])
            if not form.cleaned_data.get("remember_me"):
                request.session.set_expiry(0)
            return redirect('dashboard')

        messages.error(request, "Please check your login details and try again.")
        return render(
            request,
            'app/auth.html',
            {
                'active_tab': 'login',
                'login_form': form,
                'login_data': {'email': request.POST.get('email', '').strip().lower()},
                'registration_form': OrganizationRegistrationForm(),
                'organizations': organizations,
            },
        )

    login_form = OrganizationLoginForm()
    registration_form = OrganizationRegistrationForm()
    return render(
        request,
        'app/auth.html',
        {
            'active_tab': 'login',
            'login_form': login_form,
            'registration_form': registration_form,
            'login_data': {'email': ''},
            'organizations': organizations,
        },
    )


# ─────────────────────────────────────────────
#  LOGOUT
# ─────────────────────────────────────────────

@require_POST
def logout_view(request):
    logout(request)
    return redirect('login')


# ─────────────────────────────────────────────
#  DASHBOARD  (protected)
# ─────────────────────────────────────────────

def dashboard_view(request):
    all_facilities = Facility.objects.all()
    my_application = None
    my_facilities = None

    if request.user.is_authenticated:
        print(f"User email: '{request.user.email}'")  # Debug
        print(f"User: {request.user}")
        
        my_application = Organization.objects.filter(
            email=request.user.email
        ).first()
        
        print(f"My application: {my_application}")  # Debug
        print(f"All orgs: {Organization.objects.all().values_list('correspondence_email', flat=True)}")  # Debug
        
        if my_application:
            my_facilities = my_application.facilities.all().order_by('-submitted_at')

    context = {
        'total': all_facilities.count(),
        'approved_count': all_facilities.filter(status=RegistrationStatus.APPROVED).count(),
        'pending_count': all_facilities.filter(status=RegistrationStatus.PENDING).count(),
        'rejected_count': all_facilities.filter(status=RegistrationStatus.REJECTED).count(),
        'featured': Facility.objects.filter(
            status=RegistrationStatus.APPROVED,
            advertise_tier__in=[AdvertiseTier.BASIC, AdvertiseTier.PREMIUM]
        ).select_related('organization').order_by('-advertise_tier', 'name'),
        'my_application': my_application,
        'my_facilities': my_facilities,
        'open_add_facility': request.GET.get('open_add_facility') == '1',
    }
    # print('Context', context)

    print('My Application:', my_application)

    return render(request, 'app/dashboard.html', context)



@login_required
def add_facility(request):

    user = request.user

    # Get organization
    try:
        organization = request.user
    except Organization.DoesNotExist:
        messages.error(request, "You must create an organization first.")
        return redirect("dashboard")

    # Check approval
    if not organization.is_approved:
        messages.warning(
            request,
            "Your organization is pending approval. You cannot add a facility."
        )
        return redirect("dashboard")

    if request.method == "POST":

        # ─────────────────────────────
        # Step 3 & 4 (checkbox JSON fields)
        # ─────────────────────────────

        areas_of_intervention = request.POST.getlist("areas_of_intervention")
        mh_focus_areas = request.POST.getlist("mh_focus_areas")
        mh_service_categories = request.POST.getlist("mh_service_categories")

        facility = Facility.objects.create(

            organization=organization,

            # ─────────────────────────────
            # STEP 1
            # ─────────────────────────────

            name=request.POST.get("name"),
            public_email=request.POST.get("public_email"),
            contact_number_1=request.POST.get("contact_number_1"),
            contact_number_2=request.POST.get("contact_number_2"),
            contact_number_3=request.POST.get("contact_number_3"),
            year_founded=request.POST.get("year_founded"),
            registration_status=request.POST.get("registration_status"),
            year_formally_registered=request.POST.get("year_formally_registered"),
            country_of_registration=request.POST.get("country_of_registration"),
            logo=request.FILES.get("logo"),

            # ─────────────────────────────
            # STEP 2
            # ─────────────────────────────

            website=request.POST.get("website"),
            twitter=request.POST.get("twitter"),
            facebook=request.POST.get("facebook"),
            whatsapp=request.POST.get("whatsapp"),
            linkedin=request.POST.get("linkedin"),
            instagram=request.POST.get("instagram"),
            tiktok=request.POST.get("tiktok"),

            # ─────────────────────────────
            # STEP 3
            # ─────────────────────────────

            org_type=request.POST.get("org_type"),
            county=request.POST.get("county"),
            sub_county=request.POST.get("sub_county"),
            funding_source=request.POST.get("funding_source"),

            is_youth_org=request.POST.get("is_youth_org") == "yes",
            youth_type=request.POST.get("youth_type"),
            is_disability_org=request.POST.get("is_disability_org") == "yes",
            is_female_led=request.POST.get("is_female_led") == "yes",

            # ─────────────────────────────
            # STEP 4
            # ─────────────────────────────

            mh_focus_areas=mh_focus_areas,
            mh_service_categories=mh_service_categories,

            # ─────────────────────────────
            # STEP 5
            # ─────────────────────────────

            achievements=request.POST.get("achievements"),
            persons_reached=request.POST.get("persons_reached"),
            mh_funding_used_kes=request.POST.get("mh_funding_used_kes"),
            advertise_tier=request.POST.get("advertise"),

            # ─────────────────────────────
            # Location
            # ─────────────────────────────

            latitude=request.POST.get("latitude"),
            longitude=request.POST.get("longitude"),

            # ─────────────────────────────
            # JSON
            # ─────────────────────────────

            areas_of_intervention=areas_of_intervention,

        )
        facility.save()

        messages.success(request, "Facility submitted successfully. Await approval.")
        return redirect("dashboard")

    return redirect("dashboard")


from django.http import JsonResponse
from .models import Facility


def facilities_map_data(request):
    org_type = request.GET.get("org_type")
    youth_type = request.GET.get("youth_type")
    funding_source = request.GET.get("funding_source")

    facilities = Facility.objects.filter(
        status="approved",
        county__iexact="Kisumu"
    )

    # Apply filters
    if org_type:
        facilities = facilities.filter(org_type=org_type)

    if youth_type:
        facilities = facilities.filter(youth_type=youth_type)

    if funding_source:
        facilities = facilities.filter(funding_source=funding_source)

    data = []

    for f in facilities:
        data.append({
            "name": f.name,
            "lat": float(f.latitude),   # convert to float
            "lng": float(f.longitude),
            "sub_county": f.sub_county,
            "county": f.county,
            "status": f.status,
            "type": f.org_type,
            "youth_type": f.is_youth_org,
            "funding_source": f.funding_source,
            "year_founded": f.year_founded
        })
        print('data', data)

    return JsonResponse(data, safe=False)



def facility_filters(request):

    org_types = Facility.objects.values_list(
        "org_type", flat=True
    ).distinct()

    youth_types = Facility.objects.values_list(
        "youth_type", flat=True
    ).distinct()

    funding_sources = Facility.objects.values_list(
        "funding_source", flat=True
    ).distinct()

    return JsonResponse({
        "org_types": list(filter(None, org_types)),
        "youth_types": list(filter(None, youth_types)),
        "funding_sources": list(filter(None, funding_sources)),
    })