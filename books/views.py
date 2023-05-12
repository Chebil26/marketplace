from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

@api_view(['GET'])
def getBooks(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    books = Book.objects.filter(title__icontains=query)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


# class BookList(APIView):
#     def get(self, request):
#         books = Book.objects.all()
#         serializer = BookSerializer(books, many=True)
#         return Response(serializer.data)



class BookDetail(APIView):
    def get(self, request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)