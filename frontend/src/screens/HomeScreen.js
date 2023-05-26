import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button, Col, Container, Dropdown, Row, Image } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import { listStores } from '../actions/storeActions';
import FeaturedStores from '../components/FeaturedStores';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import FilterDropdownMenu from '../components/FilterDropdownMenu';
import Post from '../components/Post';
import Product from '../components/Product';
import { getPosts } from '../features/postSlice';
import CategoriesHeader from '../components/CategoriesHeader';

function HomeScreen() {
  const location = useLocation();
  let history = useNavigate();
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

  const queryParams = new URLSearchParams(location.search);
  let keywordHeader = queryParams.get('keyword');
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

  const categories = [
    'Fiction',
    'Mystery',
    'Non fiction',
    'Science Fiction',
    'Historical Fiction',
    'Fantasy',
    'Romance',
    'Biography',
    'Self Help',
  ];

  const authorHandler = (author) => {
    history(`?keyword=${author}&page=1`);
    console.log(author);
  };

  const filterHandler = (category) => {
    // setFilter(`?keyword=${category.toLowerCase()}&page=1`);
    history(`?keyword=${category.toLowerCase()}&page=1`);
  };

  const clearHandler = () => {
    setFilter('');
  };

  return (
    <>
      <CategoriesHeader
        categories={categories}
        filterHandler={filterHandler}
        clearHandler={clearHandler}
      />
      <div
        style={{
          margin: 0,
          padding: 0,

          overflow: 'visible',
        }}>
        {!keyword && (
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
        )}
        {/* {!keyword && <ProductCarousel />}
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
        )} */}

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
              {keyword ? `'${keywordHeader}'` : 'Books'}
            </h2>
            <FilterDropdownMenu
              categories={categories}
              filterHandler={filterHandler}
              clearHandler={clearHandler}
            />

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
                    <Product product={product} authorHandler={authorHandler} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          {!keyword && (
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
          )}
        </Row>

        <Paginate page={page} pages={pages} keyword={keyword} />
      </div>
    </>
  );
}

export default HomeScreen;
