from django.urls import path
from base.views import wishlist_views as views

urlpatterns = [
    path('create/', views.create_wishlist, name='create_wishlist'),
    path('', views.view_all_wishlists, name='view_all_wishlists'),
    path('<int:wishlist_id>/', views.view_wishlist_detail, name='view_wishlist_detail'),

]
