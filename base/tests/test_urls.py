from django.test import TestCase, Client
from django.urls import reverse
from base.models import Product
import json


class TestProductViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.products_url = reverse('products')
        self.create_product_url = reverse('product-create')
        self.upload_image_url = reverse('image-upload')
        self.top_products_url = reverse('top-products')
        self.store_products_url = reverse('store-products', args=['1'])
        self.create_review_url = reverse('create-review', args=['1'])
        self.product_url = reverse('product', args=['2'])
        self.update_product_url = reverse('product-update', args=['1'])
        self.delete_product_url = reverse('product-delete', args=['1'])

    def test_get_products(self):
        response = self.client.get(self.products_url)

        self.assertEquals(response.status_code, 200)

    # def test_create_product(self):
    #     response = self.client.post(self.create_product_url, {
    #         'name': 'Test Product',
    #         'price': 10.99,
    #         'brand': 'Test Brand',
    #         'countInStock': 10,
    #         'description': 'Test Description',
    #     })

    #     self.assertEquals(response.status_code, 302)
    #     self.assertTrue(Product.objects.filter(name='Test Product').exists())

    # def test_upload_image(self):
    #     response = self.client.post(self.upload_image_url, {
    #         'image': 'test.jpg',
    #     })

    #     self.assertEquals(response.status_code, 200)
    #     self.assertTrue(json.loads(response.content)['url'].startswith('https://'))

    def test_get_top_products(self):
        response = self.client.get(self.top_products_url)

        self.assertEquals(response.status_code, 200)

    def test_get_products_by_store(self):
        response = self.client.get(self.store_products_url)

        self.assertEquals(response.status_code, 200)

    # def test_create_product_review(self):
    #     response = self.client.post(self.create_review_url, {
    #         'rating': 5,
    #         'comment': 'Test Comment',
    #     })

    #     self.assertEquals(response.status_code, 302)

    def test_get_product(self):
        response = self.client.get(self.product_url)
        self.assertEquals(response.status_code, 200)

    # def test_update_product(self):
    #     response = self.client.put(self.update_product_url, {
    #         'name': 'Updated Product',
    #         'price': 19.99,
    #         'brand': 'Updated Brand',
    #         'countInStock': 5,
    #         'description': 'Updated Description',
    #     })

    #     self.assertEquals(response.status_code, 200)
    #     self.assertTrue(Product.objects.filter(name='Updated Product').exists())

    # def test_delete_product(self):
    #     response = self.client.delete(self.delete_product_url)

    #     self.assertEquals(response.status_code, 204)
    #     self.assertFalse(Product.objects.filter(pk=1).exists())
