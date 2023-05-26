import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField, // Import TextField component from Material-UI
  IconButton, // Import IconButton component from Material-UI
  // Import SearchIcon component from Material-UI
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

import { listProducts } from '../actions/productActions';
import { listStores } from '../actions/storeActions';
import FeaturedStores from '../components/FeaturedStores';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import FilterDropdownMenu from '../components/FilterDropdownMenu';
import Post from '../components/Post';
import { getPosts } from '../features/postSlice';
import CategoriesHeader from '../components/CategoriesHeader';
import Product from '../components/Product';

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

  return (
    <>
      <CategoriesHeader
        categories={categories}
        filterHandler={filterHandler}
        clearHandler={clearHandler}
      />
      <Box marginTop={2}>
        {!keyword && (
          <Container>
            <Grid container justifyContent='center'>
              <Grid item xs={12} md={10}>
                <img
                  src='https://i.postimg.cc/mrNF47fr/906-generated.jpg'
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
              <Grid item xs={12} md={9}>
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
              {!keyword && (
                <Grid item xs={12} md={3}>
                  <Box
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

                    <Typography
                      variant='h6'
                      component='h3'
                      color='primary'
                      fontWeight='bold'
                      marginBottom='1rem'>
                      Posts
                    </Typography>
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
                      <RouterLink to='/posts'>
                        <Button
                          variant='contained'
                          color='primary'
                          className='mt-auto'>
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
    </>
  );
}

export default HomeScreen;
