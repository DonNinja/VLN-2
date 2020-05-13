from django.urls import path, include
from . import views

urlpatterns = [
    path('get_categories_json', views.get_json_categories)
]
