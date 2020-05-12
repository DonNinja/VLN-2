from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.cart_index, name="cart index"),
    path('add_to_cart/<int:id>', views.add_to_cart, name="cart add"),
    path('remove_from_cart/', views.remove_from_cart, name="cart remove"),
    path('contact_info/', views.render_contact_info, name="contact info"),
    path('overview/', views.render_overview, name="overview"),
    path('payment/', views.render_payment, name="payment")
]
