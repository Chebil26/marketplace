import React, {useEffect} from 'react'
import { Link , useNavigate , useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col , ListGroup , Image , Form , Button , Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart , removeFromCart } from '../actions/cartActions'


function CartScreen(match , location ) {

  let history = useNavigate()
  const { id } = useParams()
  const productId = id
  // const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId))
    }
  }, [dispatch, productId])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    history('/login?redirect=shipping')
  }


  return (
    <Row>
      <Col md={8}>
        <h1>saved</h1>
        {cartItems.length === 0 ? (
          <Message variant="info"> empty <Link to='/'>Go Back</Link></Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                  
                    <Image src={item.image ? item.image : item.defaultImage} alt={item.name} fluid rounded/>
                  </Col >

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    {item.price}DA
                  </Col >

                  <Col md={1}>
                    <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col >
                </Row>

              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className="my-3 p-3 rounded"  >
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Total Price ({cartItems.reduce((acc, item) => acc + Number(item.price), 0)})DA </h2>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button 
            type='button'
            className='btn-block'
            disabled={cartItems.length === 0}
            onClick={checkOutHandler}
            >
              Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>


      
    </Row>
  )
}

export default CartScreen
