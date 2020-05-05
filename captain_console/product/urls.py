from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('<int:id>', views.get_product_by_id)
]
