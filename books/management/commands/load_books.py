import csv
import random
from django.core.management.base import BaseCommand
from base.models import Product
from books.models import Book

class Command(BaseCommand):
    help = 'Load data from a CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('books_goodreads.csv', help='books_goodreads.csv')
    # def add_arguments(self, parser):
    #     parser.add_argument('jamalon_dataset.csv', help='books/jamalon_dataset.csv')

    def handle(self, *args, **options):
        filename = options['books_goodreads.csv']

        
        # Join the categories into a single string separated by commas
        # filename = options['jamalon_dataset.csv']
        with open(filename, 'r') as f:
            reader = csv.reader(f)
            next(reader)  # skip header row
            for row in reader:
                categories_string = row[8]
                start_index = categories_string.index('[')
                end_index = categories_string.index(']')
                categories = categories_string[start_index+1:end_index]
                categories_list = [category.strip().strip("'") for category in categories.split(',')]
                
                categories_combined = ', '.join(categories_list)

                # book = Book(

                
                #     isbn=row[7],
                #     title=row[1],
                #     author=row[3],
                #     cover=row[21],                    
                #     description=row[5],
                #     published_year=row[15],
                #     categories=categories_combined,

                # )

                product = Product(

                
                    isbn=row[7],
                    name=row[1],
                    author=row[3],
                    defaultImage=row[21],
                    price=int(random.randint(3, 16) * 100),
                    
                    description=row[5],
                    published_year=row[15],
                    publisher=row[13],

                    category=categories_combined,

                )


                    #main_dataset

                #     isbn=row[8],
                #     name=row[1],
                #     author=row[2],
                #     defaultImage=row[0],
                #     price=int(random.randint(3, 16) * 100),
                #     category=row[9],
                #     description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum eleifend justo, vel iaculis urna mollis ac. Donec id purus nunc. Maecenas suscipit pharetra augue a ullamcorper.',
                # )

                #amazo,
                #     isbn=row[0],
                #     name=row[1],
                #     author=row[2],
                #     published_year=row[3],
                #     defaultImage=row[7],
                #     price=int(random.randint(3, 16)) * 100,
                #     category=random.choice(['Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Romance', 'Science fiction', 'Fantasy', 'Biography', 'Autobiography', 'History']),
                #     description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum eleifend justo, vel iaculis urna mollis ac. Donec id purus nunc. Maecenas suscipit pharetra augue a ullamcorper.',
                # )

                    #7k
                    # isbn=row[0],
                    # title=row[2],
                    # author=row[4],
                    # cover=row[6],
                    # description=row[7],
                    # published_year=row[8],
                    # num_pages=row[10],
                    # categories = row[5],

                    #jamloon
                    # title=row[1],
                    # author=row[2],
                    # description=row[3],
                    # num_pages=row[4],
                    # published_year=row[5],
                    # categories = row[8],

                

                    
                


                product.save()
        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))