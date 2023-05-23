import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Button, Col, Container, Dropdown, Row, Image } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import { listStores } from '../actions/storeActions';
import FeaturedStores from '../components/FeaturedStores';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Post from '../components/Post';
import Product from '../components/Product';
import { getPosts } from '../features/postSlice';

function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const storeList = useSelector((state) => state.storeList);
  const { loading: storesLoading, error: storesError, stores } = storeList;

  const posts = useSelector((state) => state.post.posts);
  const postsLoading = useSelector((state) => state.post.loading);
  const postsError = useSelector((state) => state.post.error);

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
      dispatch(getPosts());
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
      <Container fluid>
        <Row>
          <Col>
            <Image
              src='https://i.postimg.cc/mrNF47fr/906-generated.jpg'
              alt='Banner'
              fluid
            />
          </Col>
        </Row>
      </Container>
      {!keyword && <ProductCarousel />}
      {!keyword && (
        <Row>
          {storesLoading ? (
            <Loader />
          ) : storesError ? (
            <Message variant='danger'>{storesError}</Message>
          ) : (
            <FeaturedStores stores={stores} />
          )}
        </Row>
      )}

      {/* <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
        <Col></Col>
      </Row> */}

      {/* {!keyword && <StoreCarousel />}
      {!keyword && <ProductCarousel />} */}

      <Row>
        <Col md={9}>
          <h2
            style={{
              color: '#18bc9c',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}>
            Latest Books
          </h2>
          <div style={{ display: 'flex', marginTop: '1rem' }}>
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
            </Dropdown>
            <Button
              className='mx-1'
              variant='outline-warning'
              onClick={clearHandler}>
              Clear <i className='fa-solid fa-rotate-left'></i>
            </Button>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Row>
              {products.map((product) => (
                <Col
                  key={product._id}
                  // md={5}
                  // lg={4}
                  // xl={3}
                  // style={{ width: '200px', height: '300px' }}
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>

        <Col md={3}>
          <Container
            className='my-5'
            style={{
              height: '1500px',
              padding: '10px',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#888888 #f2f2f2',
            }}>
            <style>
              {`
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #888888;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #555555;
      }

      ::-webkit-scrollbar-track {
        background-color: #f2f2f2;
      }
    `}
            </style>

            <h3
              style={{
                color: '#18bc9c',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}>
              Posts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {posts.slice(0, 4).map((post) => (
                <div key={post._id} className='mb-3'>
                  <Post post={post} />
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'auto',
              }}>
              <Link to='/posts'>
                <Button variant='primary' className='mt-auto'>
                  Continue Reading
                </Button>
              </Link>
            </div>
          </Container>
        </Col>
      </Row>

      <Paginate page={page} pages={pages} keyword={keyword} />

      {/* Add the posts component here */}
    </div>
  );
}

export default HomeScreen;
