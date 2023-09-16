import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductCarousel from '../components/ProductCarousel';
import ProductPanel from '../components/ProductPanel';
import { ArrowForwardSharp, ArrowRightSharp } from '@mui/icons-material';

const CarouselHome = () => {
  const products = [
    {
      name: 'Harry Potter and the Order of the Phoenix',
      author: 'J.K. Rowling',
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg',
      price: 1100,
    },

    // { name: 'Book 3', author: 'Author 3', image: 'book3.jpg', price: 9.99 },
    // { name: 'Book 4', author: 'Author 4', image: 'book4.jpg', price: 14.99 },
  ];

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={100}>
        <img
          src='https://firebasestorage.googleapis.com/v0/b/adeem-9a87d.appspot.com/o/9066-1.jpg?alt=media&token=374e1e11-0f0d-4ad5-b613-2ffba9f03e15'
          alt='Banner'
          style={{ width: '100%', height: 'auto' }}
        />

        {/* <div>
        <ProductCarousel />
      </div> */}

        <div
          style={{
            display: 'flex', // Use flexbox for horizontal layout
            justifyContent: 'center', // Add space between the cards
          }}>
          {/* <h2 style={{ textAlign: 'center' }}>New Arrivals</h2> */}

          {products.map((product, index) => (
            <ProductPanel key={index} {...product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            to='/wishlist'
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#E5E5E5',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}>
            <div>
              <Typography
                variant='h3'
                component='h2'
                style={{ color: '#185b89' }}>
                Wishlist
              </Typography>
              <Typography>
                Can't find a book? Request a book for stores to add, in our
                wishlist
                <ArrowForwardSharp />
              </Typography>
            </div>
          </Link>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselHome;
