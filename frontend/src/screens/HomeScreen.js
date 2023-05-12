import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useLocation  } from 'react-router-dom'

import { Row, Col, Button, Dropdown } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import SelectProduct from '../components/SelectProduct'
import Paginate from '../components/Paginate'

function HomeScreen() {

  let history = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages } = productList

const [filter, setFilter] = useState('')
let keyword = location.search
// setKey(keyword)

  useEffect(() =>{
    if (keyword){
      dispatch(listProducts(keyword))
    }else if(filter){
      dispatch(listProducts(filter))

    }else{
      dispatch(listProducts())
    }
    
  }, [dispatch, keyword, filter])


  const fictionFilterHandler = ( ) => {
    setFilter('?keyword=fiction&page=1')
  }

  const novelFilterHandler = ( ) => {
    setFilter('?keyword=novel&page=1')
  }

  const historyFilterHandler = ( ) => {
    setFilter('?keyword=history&page=1')

  }

  const clearHandler = ( ) => {
    setFilter('')
  }


 
  return (
    
    <div >
      
      {!keyword && <ProductCarousel/> }
      
      <h1>Latest Books</h1>
      <div style={{ paddingRight : '2rem',position: 'relative', display: 'flex', flexDirection: 'row-reverse' }}>
      <Dropdown drop="end" alignRight>
      <Dropdown.Toggle variant="outline-info" id="dropdown-button">
      Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        
          <Dropdown.Item onClick={fictionFilterHandler}>
            <Button className='mx-1' variant="info" block>
            Fiction
            </Button>
          </Dropdown.Item>

          <Dropdown.Item onClick={historyFilterHandler}>
            <Button className='mx-1' variant="info" block>
            History
            </Button>
          </Dropdown.Item>

          <Dropdown.Item onClick={novelFilterHandler}>
            <Button className='mx-1' variant="info" block>
            Novels
            </Button>
          </Dropdown.Item>

          


      </Dropdown.Menu>
      <Button className='mx-1' variant="outline-warning" block  onClick={clearHandler}>
            Clear <i class="fa-solid fa-rotate-left"></i>
            </Button>
    </Dropdown>
      {/* <Button className='mx-3' variant='secondary' onClick={filterHandler}>
        <i className='fas fa-plus'></i> Filter
      </Button>
      <Button className='mx-3' variant='secondary' onClick={clearHandler}>
        <i className='fas fa-plus'></i> Clear
      </Button> */}
      </div>

      
      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : 

          <div>
          <Row   >
            {products.map(product => (
              // sm={12} md={6} lg={4} xl={3}
              <Col key={product._id} >
                  <Product product={product} />
              </Col>
            ))}

          </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
      }
      
    </div>
  )
}

export default HomeScreen
