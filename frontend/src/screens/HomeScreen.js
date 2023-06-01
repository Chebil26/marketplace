import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { listProducts } from '../actions/productActions';
import { listStores } from '../actions/storeActions';
import CategoriesHeader from '../components/CategoriesHeader';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Post from '../components/Post';
import Product from '../components/Product';
import { getPosts } from '../features/postSlice';
import Store from '../components/Store';

function HomeScreen() {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Show arrows for navigation
    prevArrow: <ChevronLeft />, // Replace with your custom previous arrow component
    nextArrow: <ChevronRight />, // Replace with your custom next arrow component
    dots: true,
    infinite: true,
  };
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

  const [isKeywordExists, setIsKeywordExists] = useState(false);

  useEffect(() => {
    setIsKeywordExists(Boolean(keyword));
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
    'Classics',
  ];

  const authorHandler = (author) => {
    history(`?keyword=${author}&page=1`);
    console.log(author);
  };

  const filterHandler = (category) => {
    history(`?keyword=${category.toLowerCase()}&page=1`);
  };

  const clearHandler = () => {
    setFilter('');
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setFilter(value);
    history(`?keyword=${value}&page=1`);
  };

  const handleClearSearch = () => {
    setFilter('');
    history(`?keyword=&page=1`);
  };

  return (
    <Box>
      <CategoriesHeader
        categories={categories}
        filterHandler={filterHandler}
        clearHandler={clearHandler}
      />
      <Box marginTop={2}>
        {!isKeywordExists && (
          <Container>
            <Grid container justifyContent='center'>
              <Grid>
                <img
                  src='https://i.postimg.cc/FRz8M1Rh/9066-1.jpg'
                  alt='Banner'
                  style={{ width: '100%', height: 'auto' }}
                />
              </Grid>
            </Grid>
          </Container>
        )}

        <Container>
          <Box marginTop={4}>
            <Grid container spacing={2}>
              <Grid item xs={keyword ? 12 : 9} md={keyword ? 12 : 9}>
                <Typography
                  variant='h6'
                  component='h2'
                  color='primary'
                  fontWeight='bold'
                  marginBottom='0.5rem'
                  sx={{
                    fontFamily: 'Arial', // Replace with your desired font or font stack
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '0.5rem',
                  }}>
                  {keyword ? `'${keywordHeader}'` : 'Books'}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}>
                  <TextField
                    id='search'
                    label='Search books'
                    variant='outlined'
                    size='small'
                    value={filter}
                    sx={{ width: '100%', marginRight: '0.5rem' }}
                    onChange={handleSearch}
                  />
                  <IconButton
                    onClick={() => history(`?keyword=${filter}&page=1`)}>
                    <SearchIcon />
                  </IconButton>
                  <IconButton onClick={() => handleClearSearch()}></IconButton>
                </Box>

                {/* <FilterDropdownMenu
                  categories={categories}
                  filterHandler={filterHandler}
                  clearHandler={clearHandler}
                /> */}

                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Grid container spacing={1}>
                    {products.map((product) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={product._id}
                        sx={{ margin: '0', padding: '0' }}>
                        <Product
                          product={product}
                          authorHandler={authorHandler}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
              {!isKeywordExists && (
                <Grid item xs={12} md={3}>
                  <Box
                    className='my-5'
                    style={{
                      padding: '10px',
                      overflowY: 'visible',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#888888 #f2f2f2',
                    }}>
                    <Typography
                      variant='h6'
                      component='h3'
                      color='primary'
                      fontWeight='bold'
                      marginBottom='1rem'>
                      Stores
                    </Typography>
                    {stores && (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Slider {...settings}>
                          {stores.slice(0, 4).map((store) => (
                            <div key={store._id} className='mb-3'>
                              <Store store={store} />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 'auto',
                      }}>
                      <RouterLink to='/stores'>
                        <Button
                          variant='contained'
                          color='success'
                          className='mt-auto'
                          style={{ textTransform: 'none' }}>
                          Show All
                        </Button>
                      </RouterLink>
                    </div>
                  </Box>

                  <Box
                    className='my-5'
                    style={{
                      padding: '10px',
                      overflowY: 'visible',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#888888 #f2f2f2',
                    }}>
                    <Typography
                      variant='h6'
                      component='h3'
                      color='primary'
                      fontWeight='bold'
                      marginBottom='1rem'>
                      Posts
                    </Typography>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Slider {...settings}>
                        {posts.slice(0, 4).map((post) => (
                          <div key={post._id} className='mb-3'>
                            <Post post={post} />
                          </div>
                        ))}
                      </Slider>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 'auto',
                      }}>
                      <RouterLink to='/posts'>
                        <Button
                          variant='contained'
                          color='success'
                          className='mt-auto'
                          style={{ textTransform: 'none' }}>
                          Continue Reading
                        </Button>
                      </RouterLink>
                    </div>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Paginate page={page} pages={pages} keyword={keyword} />
    </Box>
  );
}

export default HomeScreen;
