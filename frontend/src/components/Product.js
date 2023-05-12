import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'

function Product({product}) {

  const placeholder = '/images/book_placeholder.png' 

  return (
    <Card className="my-3 p-3 rounded" style={{ width: '13rem' }} >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image ? product.image :
    product.defaultImage ? product.defaultImage:
    placeholder
            }  style={{ width: '100%', height: '100%' }}/>
      </Link>

      <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as="p">
            <strong>{product.name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as="p">
            {product.author}
        </Card.Text>


      <Link to={`/stores/${product.store_id}`}>
        <Card.Title as="p">
            <strong>{product.store}</strong>
        </Card.Title>
      </Link>
      

        <Card.Text as="p">
            <div className='my-1'>
                
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </div>
        </Card.Text>

        <Card.Text as="p">
            {product.price}DA
        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Product
