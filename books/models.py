from django.db import models

class Book(models.Model):
    isbn= models.CharField(max_length=1000, null=True, blank=True )
    title = models.CharField(max_length=1000, null=True, blank=True)
    cover = models.ImageField(null=True, blank=True , max_length=1000)
    image = models.CharField(max_length=1000, null=True, blank=True)
    author = models.CharField(max_length=1000, null=True, blank=True)
    published_year = models.CharField(max_length=1000, null=True, blank=True )
    description = models.TextField(max_length=1000,null=True, blank=True)
    num_pages = models.CharField(max_length=1000, null=True, blank=True )
    categories = models.CharField(max_length=1000, null=True, blank=True )

    def __str__(self):
        return self.title
