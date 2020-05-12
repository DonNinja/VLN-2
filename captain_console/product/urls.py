from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('type_filter/<int:id>', views.filter_product),
    path('<int:id>', views.get_product_by_id),
    path('filtered', views.advanced_filter, name="filtered")
]
