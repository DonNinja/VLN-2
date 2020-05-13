from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('<int:id>', views.get_manufacturer_by_id),
    path('get_manufacturer_json', views.get_json_manufacturer)
]
