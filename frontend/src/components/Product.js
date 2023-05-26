import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Rating from './Rating';

function Product({ product, authorHandler }) {
  const placeholder = `${process.env.REACT_APP_API_SERVER}/images/book_placeholder.png`;

  return (
    <Card className='my-1 p-2 rounded' sx={{ width: 200, overflow: 'hidden' }}>
      <Link to={`/product/${product._id}`}>
        <div
          style={{
            width: '9rem',
            height: '13rem',
            overflow: 'hidden',
            position: 'relative',
          }}>
          <img
            src={
              product.image
                ? `${process.env.REACT_APP_API_SERVER}${product.image}`
                : product.defaultImage
                ? product.defaultImage
                : placeholder
            }
            alt={product.name}
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translate(-50%, 0)',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <CardContent className='p-0'>
        <Link authorHandler>
          <Typography
            variant='subtitle1'
            component='p'
            sx={{ margin: 0, padding: 0 }}>
            <strong>{product.name}</strong>
          </Typography>
        </Link>

        <Link onClick={() => authorHandler(product.author)}>
          <Typography
            variant='subtitle2'
            component='p'
            sx={{ margin: 0, padding: 0 }}>
            {product.author}
          </Typography>
        </Link>

        <Link to={`/stores/${product.store_id}`}>
          <Typography
            variant='subtitle1'
            component='p'
            sx={{ margin: 0, padding: 0 }}>
            <strong>{product.store}</strong>
          </Typography>
        </Link>

        <Typography
          variant='body1'
          component='p'
          sx={{ margin: 0, padding: 0 }}>
          <div className='my-1'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} `}
              color={'#f8e825'}
            />
          </div>
        </Typography>

        <Typography
          variant='subtitle2'
          component='p'
          sx={{ margin: 0, padding: 0 }}>
          {product.price}DA
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Product;
