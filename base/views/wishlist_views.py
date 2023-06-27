from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated 

from rest_framework.response import Response
from base.models import Wishlist
from base.serializers import WishlistSerializer


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_wishlist(request):
    print(request.data)
    serializer = WishlistSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # Assuming you have authentication set up
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def view_all_wishlists(request):
    wishlists = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(wishlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def view_wishlist_detail(request, wishlist_id):
    try:
        wishlist = Wishlist.objects.get(pk=wishlist_id)
    except Wishlist.DoesNotExist:
        return Response({'error': 'Wishlist does not exist.'}, status=404)

    serializer = WishlistSerializer(wishlist)
    return Response(serializer.data)
