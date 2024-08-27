from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('register/', views.register),
    path('login/', views.login),
    path('protected/', views.protected_view),
]