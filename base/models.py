from django.db import models

from django.contrib.auth.models import User

from books.models import Book


class Store(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,default='/store_placeholder.png') 
    address = models.CharField(max_length=255,null=True, blank=True)
    wilaya = models.CharField(max_length=200, null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6,null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name


class Product(models.Model):

    LANGUAGE = (
        ('AR', 'Arabic'),
        ('EN', 'English'),
        ('FR', 'French'),
    )
    
    store = models.ForeignKey(Store, on_delete=models.SET_NULL, null=True)
    
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True , blank=True)
    b_id =  models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=1000, null=True, blank=True)
    author = models.CharField(max_length=1000, null=True, blank=True)
    isbn = models.CharField(max_length=1000, null=True, blank=True)
    published_year = models.CharField(max_length=1000, null=True, blank=True)
    num_pages = models.IntegerField(null=True, blank=True, default=200)
    image = models.ImageField(null= True , blank=True)
    language = models.CharField( max_length=2 , choices=LANGUAGE, default='EN' , null=True, blank=True)  
    defaultImage = models.CharField(max_length=1000, null=True, blank=True  )                 
    publisher = models.CharField(max_length=1000, null=True, blank=True)
    category = models.CharField(max_length=1000, null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, default=0)  
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    available =models.BooleanField(default=True ,  blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    isbn = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
    



class ChallengeType(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Challenge(models.Model):

    # name = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    challenge_type = models.ForeignKey(ChallengeType, on_delete=models.CASCADE)
    goal =  models.IntegerField(blank=True, null=True)
    current_read_books =  models.IntegerField(blank=True, null=True)
    books_read = models.CharField(max_length=4000000, null=True, blank=True)

    

    def __str__(self):

        return str(self.user.first_name) +  '`s  ' + str(self.challenge_type ) 
class ChallengeProgres(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    progress = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.challenge)
    

