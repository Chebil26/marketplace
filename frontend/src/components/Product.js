import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import Rating from './Rating';

function Product({ product }) {
  const placeholder = `${process.env.REACT_APP_API_SERVER}/images/book_placeholder.png`;
  const storePlaceholeder = `${process.env.REACT_APP_API_SERVER}/images/store_placeholder.png`;
  const storeNamePlaceholder = 'store';

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
              width: '100%', // Set the width to 100% to make all images have the same size
              height: '100%', // Set the height to 100% to make all images have the same size
            }}
          />
        </div>
      </Link>
      <CardContent className='p-0'>
        <Link to={`/product/${product._id}`}>
          <Typography
            variant='subtitle1'
            component='p'
            sx={{ margin: 0, padding: 0 }}>
            <strong>{product.name}</strong>
          </Typography>
        </Link>
        <Link to={`?keyword=${product.author}&page=1`}>
          <Typography
            variant='subtitle2'
            component='p'
            sx={{ margin: 0, padding: 0 }}>
            {product.author}
          </Typography>
        </Link>

        <Link
          to={product.store_id ? `/stores/${product.store_id}` : '/stores'}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}>
          <CardMedia
            component='img'
            src={
              product.store_image
                ? `${process.env.REACT_APP_API_SERVER}${product.store_image}`
                : storePlaceholeder
            }
            alt={product.store}
            sx={{
              height: 32,
              width: 32,
              borderRadius: '50%',
              marginRight: '0.5rem',
            }}
          />
          <Typography
            variant='subtitle1'
            component='p'
            sx={{ margin: 0, padding: 0 }}>
            <strong>
              {product.store ? product.store : storeNamePlaceholder}
            </strong>
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
