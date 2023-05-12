

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q




from base.models import Product,Review, Store
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(Q(name__icontains=query) | Q(author__icontains=query) | Q(category__icontains=query) | Q(isbn__icontains=query)).order_by('createdAt')
    page = request.query_params.get('page')
    paginator = Paginator(products, 20)

    try: 
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1 

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page, 'pages':paginator.num_pages})

@api_view(['GET'])
def getProductsByStore(request, pk):
    category = request.GET.get('category')
    products = Product.objects.filter(store__id__icontains=pk)
    if category:
        products = products.filter(category__icontains=category)
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        product = None

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    store = get_object_or_404(Store, user=user)
    product = Product.objects.create(
        store = store,
        name= 'sample name',
        price = 0,
        language = 'FR',
        publisher= 'Sample publisher',
        category= 'sample category',
        description= 'sample description',

    )
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



@api_view(['PUT'])
# @permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    if data['num_pages']:
        np = data['num_pages']
    else:
        np = 200

    product.b_id = data['book_id']
    product.name = data['name']
    product.author = data['author']
    product.defaultImage = data['defaultImage']
    product.isbn = data['isbn']
    product.published_year = data['published_year']
    product.num_pages = np
    product.description = data['description']
    product.category = data['category']
    product.publisher = data['publisher']
    product.available = data['available']
    product.price = data['price']
    product.language = data['language']

    product.save()
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response('Product Deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Book already reviewd'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No rating or 0 
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review 

    else:
        review = Review.objects.create(
            user= user,
            product= product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0 
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')


