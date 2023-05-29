from rest_framework import generics, permissions
from base.models import Order, Product, Store
from base.serializers import OrderSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.response import Response

# @permission_classes([IsAuthenticated])
# class OrderCreateView(generics.CreateAPIView):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

@permission_classes([IsAuthenticated])
class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

@permission_classes([IsAuthenticated])
class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    
@api_view(['POST'])
def create_order(request):
    # Extract the necessary data from the request
    user = request.user  # Assuming you have authentication in place
    product_id = request.data.get('product')
    store_id = request.data.get('store')

    # Perform any additional validation or processing here

    try:
        store = Store.objects.get(id=store_id)
    except Store.DoesNotExist:
        return Response({'message': 'Store not found'}, status=400)

    try:
        product = Product.objects.get(_id=product_id)
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=400)

    # Register the order in your database
    order = Order.objects.create(user=user, store=store, product=product)
    
    order_data = {
        
        'user': order.user.id,
        'store': order.store.id,
        'product': order.product._id,
        'isPaid': order.isPaid,
        'paidAt': order.paidAt,
        'isDelivered': order.isDelivered,
        'deliveredAt': order.deliveredAt,
    }

    # Return a response indicating success
    return Response({
        'message': 'Order registered successfully',
        'order': order_data
    })
