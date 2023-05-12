from django.test import TestCase
from django.contrib.auth.models import User
from base.models import Store, Product, Review
from books.models import Book

class StoreTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.store = Store.objects.create(
            user=self.user,
            name='Test Store',
            wilaya='Algiers'
        )

    def test_store_str_method(self):
        self.assertEqual(str(self.store), 'Test Store')

    def test_store_user_field(self):
        self.assertEqual(self.store.user, self.user)

class ProductTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.store = Store.objects.create(
            user=self.user,
            name='Test Store',
            wilaya='Algiers'
        )
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            isbn='1234567890',
            published_year='2020',
            num_pages=200,
        )
        self.product = Product.objects.create(
            store=self.store,
            book=self.book,
            name='Test Product',
            author='Test Author',
            isbn='1234567890',
            published_year='2020',
            num_pages=200,
            language='EN',
            publisher='Test Publisher',
            category='Test Category',
            description='Test Description',
            rating=4.5,
            numReviews=10,
            price=10.99,
            available=True,
            defaultImage='/default_image.jpg'
        )

    def test_product_str_method(self):
        self.assertEqual(str(self.product), 'Test Product')

    def test_product_store_field(self):
        self.assertEqual(self.product.store, self.store)

    def test_product_book_field(self):
        self.assertEqual(self.product.book, self.book)

class ReviewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.store = Store.objects.create(
            user=self.user,
            name='Test Store',
            wilaya='Algiers'
        )
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            isbn='1234567890',
            published_year='2020',
            num_pages=200,
        )
        self.product = Product.objects.create(
            store=self.store,
            book=self.book,
            name='Test Product',
            author='Test Author',
            isbn='1234567890',
            published_year='2020',
            num_pages=200,
            language='EN',
            publisher='Test Publisher',
            category='Test Category',
            description='Test Description',
            rating=4.5,
            numReviews=10,
            price=10.99,
            available=True,
            defaultImage='/default_image.jpg'
        )
        self.review = Review.objects.create(
            product=self.product,
            user=self.user,
            name='Test User',
            rating=4,
            comment='Test Comment',
        )

    def test_review_str_method(self):
        self.assertEqual(str(self.review), '4')

    def test_review_product_field(self):
        self.assertEqual(self.review.product, self.product)

    def test_review_user_field(self):
        self.assertEqual(self.review.user, self.user)
