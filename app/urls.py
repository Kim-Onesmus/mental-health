from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path("add-facility/", views.add_facility, name="add_facility"),
    path("api/facilities/", views.facilities_map_data, name="facilities_map_data"),
    path("api/filters/", views.facility_filters, name="facility_filters"),
    path('api/profile/update/', views.update_profile, name='update_profile'),
    path('api/password/change/', views.change_password, name='change_password'),
]