from django.urls import path
from base.views import product_views as views



urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('top/', views.getTopProducts, name="top-products"),
    path('store/<str:pk>/', views.getProductsByStore, name="store-products"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('<str:pk>/', views.getProduct, name="product"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    
    path('similar/<str:isbn>/', views.products_by_isbn, name='products-by-isbn'),



]
