from django.urls import path
from . import views

urlpatterns = [
    path('', views.Index, name='index'),
    path("api/facilities/", views.facilities_map_data, name="facilities-map-data"),
]