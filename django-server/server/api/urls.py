from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('register/', views.register),
    path('login/', views.login),
    path('protected/', views.protected_view),
    path('create-ad/', views.create_ad),
    path('get-published-ads/', views.get_published_ads),
    path('get-all-published-ads/', views.get_all_published_ads),
    path('delete-ad/<int:pk>/', views.delete_ad),
]