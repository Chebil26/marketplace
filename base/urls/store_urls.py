from django.urls import path
from base.views import store_views as views



urlpatterns = [
    path('', views.getStores, name="stores"),
    path('user/', views.getStoreByUser, name="getStoreByUser"),
    path('<str:pk>/', views.getStore, name="store"),
    
    


]
