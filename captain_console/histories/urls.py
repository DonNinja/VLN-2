from django.urls import path, include
from . import views

urlpatterns = [
    path('search_history', views.search_index, name="search_index")
]
