from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views.review_index, name="review_index"),
    path('<int:id>', views.get_review_by_id),
    path('create_review/<int:id>', views.create_review),
    path('product/<int:id>', views.get_review_by_product)
]