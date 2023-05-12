import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Store({store}) {

  return (
    <Card className="my-3 p-3 rounded" style={{ width: '14rem' }} >
      <Link to={`/stores/${store.id}`}>
        <Card.Img src={store.image}  style={{ width: '100%', height: '100%' }}/>
      </Link>

      <Card.Body>
      <Link to={`/stores/${store.id}`}>
        <Card.Title as="div">
            <strong>{store.name}</strong>
        </Card.Title>
      </Link>



        <Card.Text as="div">
            {store.wilaya}
        </Card.Text>


        {/* <Card.Text as="div">
            <div className='my-3'>
                
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </div>
        </Card.Text>

        <Card.Text as="h4">
            {product.price}DA
        </Card.Text> */}

      </Card.Body>
    </Card>
  )
}

export default Store
