from django.urls import path, include
from . import views

urlpatterns = [
    path('search_history', views.search_index, name="search_index"),
    path('purchase_history', views.purchase_index, name="purchase_index")
]
