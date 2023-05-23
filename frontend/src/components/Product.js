import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

function Product({ product }) {
  const placeholder = '/images/book_placeholder.png';

  return (
    <Card
      className='my-1 p-2 rounded'
      style={{ width: '10rem', overflow: 'hidden' }}>
      <Link to={`/product/${product._id}`}>
        <div
          style={{
            width: '9rem',
            height: '13rem',
            overflow: 'hidden',
            position: 'relative',
          }}>
          <Card.Img
            src={
              product.image
                ? `${process.env.REACT_APP_API_SERVER}${product.image}`
                : product.defaultImage
                ? product.defaultImage
                : placeholder
            }
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <Card.Body className='p-0'>
        <Link to={`/product/${product._id}`}>
          <Card.Title
            as='p'
            style={{ fontSize: '15px', margin: '0', padding: '0' }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text
          as='p'
          style={{ fontSize: '13px', margin: '0', padding: '0' }}>
          {product.author}
        </Card.Text>

        <Link to={`/stores/${product.store_id}`}>
          <Card.Title
            as='p'
            style={{ fontSize: '14px', margin: '0', padding: '0' }}>
            <strong>{product.store}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='p' style={{ margin: '0', padding: '0' }}>
          <div className='my-1'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} `}
              color={'#f8e825'}
            />
          </div>
        </Card.Text>

        <Card.Text
          as='p'
          style={{ fontSize: '13px', margin: '0', padding: '0' }}>
          {product.price}DA
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
