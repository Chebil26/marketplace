from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from base.models import Product, Review, Store
from base.serializers import ProductSerializer,StoreSerializer

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from rest_framework.test import APITestCase, APIClient

# Initialize the APIClient app
client = APIClient()

class ProductViewsTest(TestCase):
    def setUp(self):
        # Create a product object for testing
        self.product = Product.objects.create(
            name='Test Product',
            price=50,
            category='test',
            description='This is a test product'
        )

    # def test_get_products(self):
    #     """
    #     Test the getProducts view
    #     """
    #     response = client.get(reverse('products'))
    #     products = Product.objects.all()
    #     serializer = ProductSerializer(products, many=True)
    #     self.assertEqual(response.data, serializer.data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_product_by_id(self):
        """
        Test the getProduct view
        """
        response = client.get(reverse('product', args=[self.product._id]))
        product = Product.objects.get(_id=self.product._id)
        serializer = ProductSerializer(product, many=False)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_create_product(self):
    #     """
    #     Test the createProduct view
    #     """

    #     # First, create a user
    #     user = User.objects.create_user('testuser@email.com', password='12345678')

    #     # Then, create a token for the user
    #     # token = Token.objects.create(user=user)

    #     # Next, create a client instance
    #     client = APIClient()

    #     # Finally, set the token in the client's Authorization header
    #     client.credentials(HTTP_AUTHORIZATION='Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNTYzOTE0LCJpYXQiOjE2Nzk5NzE5MTQsImp0aSI6ImExMDhiODAzYmM4YjRhYWViYmIyYWUxZjEzMzI1M2YzIiwidXNlcl9pZCI6M30.v713wHGtMgU4V0B5KC0sZ318IJ-wibYb0GguQ-cGoCA')

    #     data = {
    #         'name': 'Test Product',
    #         'price': 10.99,
    #         'category': 'Test Category',
    #         'description': 'Test Description',
    #         # Include any other required fields here
    #     }
    #     response = client.post(reverse('product-create'), data=data)
    #     product = Product.objects.latest('created_at')
    #     serializer = ProductSerializer(product, many=False)
    #     self.assertEqual(response.data, serializer.data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_update_product(self):
    #     """
    #     Test the updateProduct view
    #     """
    #     data = {
    #         'name': 'Updated Product',
    #         'price': 100,
    #         'category': 'test updated',
    #         'description': 'This is an updated test product'
    #     }
    #     response = client.put(reverse('product-update', args=[self.product._id]), data=data)
    #     product = Product.objects.get(_id=self.product._id)
    #     serializer = ProductSerializer(product, many=False)
    #     self.assertEqual(response.data, serializer.data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_delete_product(self):
    #     """
    #     Test the deleteProduct view
    #     """
    #     response = client.delete(reverse('product-delete', args=[self.product._id]))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_create_review(self):
    #     """
    #     Test the createProductReview view
    #     """
    #     data = {
    #         'rating': 4,
    #         'comment': 'This is a test review'
    #     }
    #     response = client.post(reverse('create-review', args=[self.product._id]), data=data)
    #     review = Review.objects.latest('created_at')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(review.rating, data['rating'])
    #     self.assertEqual(review.comment, data['comment'])

    def test_get_top_products(self):
        """
        Test the getTopProducts view
        """
        response = client.get(reverse('top-products'))
        products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_products_by_store(self):
        """
        Test the getProductsByStore view
        """
        store = Store.objects.create(name='Test Store')
        product = Product.objects.create






# store views

class GetStoresTest(APITestCase):
    def setUp(self):
        self.url = reverse('stores')

    def test_get_all_stores(self):
        # Arrange
        Store.objects.create(name="Test Store")
        expected_data = StoreSerializer(Store.objects.all(), many=True).data

        # Act
        response = client.get(self.url)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_data)

class GetStoreTest(APITestCase):
    def setUp(self):
        self.store = Store.objects.create(name="Test Store")
        self.url = reverse('store', args=[self.store.id])

    def test_get_store(self):
        # Arrange
        expected_data = StoreSerializer(self.store).data

        # Act
        response = client.get(self.url)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_data)



# class GetStoreByUserTest(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username='testuser', password='testpass')
#         self.store = Store.objects.create(name="Test Store", user=self.user)
#         self.token = Token.objects.create(user=self.user)
#         self.url = reverse('getStoreByUser')


#     def test_get_store_by_user(self):
#         # Arrange
#         client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         expected_data = StoreSerializer(self.store).data

#         # Act
#         response = client.get(self.url)

#         # Assert
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, expected_data)
