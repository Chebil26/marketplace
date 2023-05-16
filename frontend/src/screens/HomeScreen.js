import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Col, Dropdown } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import { listStores } from '../actions/storeActions';
import FeaturedStores from '../components/FeaturedStores';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';

function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const storeList = useSelector((state) => state.storeList);
  const { loading: storesLoading, error: storesError, stores } = storeList;

  const [filter, setFilter] = useState('');
  let keyword = location.search;
  // setKey(keyword)

  useEffect(() => {
    if (keyword) {
      dispatch(listProducts(keyword));
    } else if (filter) {
      dispatch(listProducts(filter));
    } else {
      dispatch(listProducts());
      dispatch(listStores());
    }
  }, [dispatch, keyword, filter]);

  const fictionFilterHandler = () => {
    setFilter('?keyword=fiction&page=1');
  };

  const novelFilterHandler = () => {
    setFilter('?keyword=novel&page=1');
  };

  const historyFilterHandler = () => {
    setFilter('?keyword=history&page=1');
  };

  const clearHandler = () => {
    setFilter('');
  };

  return (
    <div>
      {!keyword &&
        (storesLoading ? (
          <Loader />
        ) : storesError ? (
          <Message variant='danger'>{storesError}</Message>
        ) : (
          <FeaturedStores stores={stores} />
        ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <h1>Latest Books</h1>
        <Dropdown drop='end' alignRight>
          <Dropdown.Toggle variant='outline-info' id='dropdown-button'>
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={fictionFilterHandler}>
              <Button className='mx-1' variant='info' block>
                Fiction
              </Button>
            </Dropdown.Item>
            <Dropdown.Item onClick={historyFilterHandler}>
              <Button className='mx-1' variant='info' block>
                History
              </Button>
            </Dropdown.Item>
            <Dropdown.Item onClick={novelFilterHandler}>
              <Button className='mx-1' variant='info' block>
                Novels
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
          <Button
            className='mx-1'
            variant='outline-warning'
            block
            onClick={clearHandler}>
            Clear <i className='fa-solid fa-rotate-left'></i>
          </Button>
        </Dropdown>
      </div>
      {/* {!keyword && <StoreCarousel />}
      {!keyword && <ProductCarousel />} */}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          products.map((product) => (
            <Col key={product._id} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </div>
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
}

export default HomeScreen;
