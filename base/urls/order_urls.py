from django.urls import path
from base.views.order_views import *
urlpatterns = [
    path('create/', create_order, name='order-create'),
    path('', OrderListView.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
]
