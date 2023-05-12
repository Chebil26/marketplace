from django.urls import path
from .views import  BookDetail, getBooks


urlpatterns = [
    path('api/books/', getBooks, name='book_list'),
    path('api/books/<int:pk>/', BookDetail.as_view(), name='book_detail'),
    
]