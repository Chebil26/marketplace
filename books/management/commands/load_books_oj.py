import csv
from django.core.management.base import BaseCommand
from books.models import Book

class Command(BaseCommand):
    help = 'Load data from a CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('books.csv', help='books/books.csv')
    # def add_arguments(self, parser):
    #     parser.add_argument('jamalon_dataset.csv', help='books/jamalon_dataset.csv')

    def handle(self, *args, **options):
        filename = options['books.csv']
        # filename = options['jamalon_dataset.csv']
        with open(filename, 'r') as f:
            reader = csv.reader(f)
            next(reader)  # skip header row
            for row in reader:
                book = Book(

                    

                    #amazon
                    isbn=row[0],
                    title=row[1],
                    author=row[2],
                    published_year=row[3],
                    cover=row[7],
                    

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
                    
                    # add other fields as needed
                )
                


                book.save()
        self.stdout.write(self.style.SUCCESS('Data loaded successfully.'))