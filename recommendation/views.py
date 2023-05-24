from rest_framework.decorators import api_view
from rest_framework.response import Response

from .recommendation import recommend

@api_view(['GET'])
def book_recommendation(request, book_name):
    recommendations = recommend(book_name)
    print("hello")
    return Response({'recommendations': recommendations})
