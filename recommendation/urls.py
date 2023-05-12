from django.urls import path
from .views import book_recommendation

urlpatterns = [
    path('book_recommendation/<str:book_name>/', book_recommendation, name='book_recommendation'),
]