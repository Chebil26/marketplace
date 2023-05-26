import React, { useEffect, useState } from 'react';
import {
  Chip,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  createProductReview,
  listProductDetails,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { getBookRecommendations } from '../actions/recommendationActions';

const ProductScreen = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const placeholder = '/images/book_placeholder.png';

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const bookRecommendations = useSelector((state) => state.bookRecommendations);
  const {
    loading: loadingBookRecommendations,
    error: errorBookRecommendations,
    recommendations,
  } = bookRecommendations;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    dispatch(getBookRecommendations(product.name));

    return () => {
      // Clear the recommendations state after using it
      dispatch({ type: 'CLEAR_BOOK_RECOMMENDATIONS' });
    };
  }, [dispatch, id, successProductReview, product.name]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}`);
  };

  return (
    <Container>
      <Link
        to='/'
        component={Button}
        variant='outlined'
        color='primary'
        sx={{ mb: 3 }}>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Card>
              <CardMedia
                component='img'
                height='400'
                width='160'
                image={
                  product.image
                    ? `${process.env.REACT_APP_API_SERVER}${product.image}`
                    : product.defaultImage || placeholder
                }
                alt={product.name}
              />
              <CardContent>
                <Typography variant='subtitle1' component='div'>
                  <Rating
                    value={product.rating}
                    text={`(${product.numReviews})`}
                    color='#f8e825'
                  />
                </Typography>
                <Typography variant='subtitle1' component='div'>
                  ISBN: {product.isbn}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card>
              <CardContent>
                <Typography variant='h4' component='h2'>
                  {product.name}
                </Typography>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  by {product.author}
                </Typography>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  <Link to={`/stores/${product.store_id}`} color='inherit'>
                    Store: {product.store}
                  </Link>
                </Typography>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Price: {product.price}DA
                </Typography>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Categories:
                </Typography>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Categories:
                </Typography>
                <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.category &&
                    product.category.split(',').map((category) => (
                      <Button
                        key={category.trim()}
                        variant='contained'
                        color='primary'
                        size='small'
                        sx={{ mb: 1 }}>
                        {category.trim()}
                      </Button>
                    ))}
                </Box>

                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Description:
                </Typography>
                <Typography variant='body1' component='p'>
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Price:
                </Typography>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  <strong>{product.price} DA</strong>
                </Typography>
                <Typography variant='h6' component='div'>
                  Availability:
                </Typography>
                <Chip
                  label={product.available ? 'Available' : 'Unavailable'}
                  color={product.available ? 'success' : 'error'}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={addToCartHandler}
                  // disabled={!product.available}
                  fullWidth
                  sx={{ mt: 2 }}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
            {recommendations && Object.keys(recommendations).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Recommended Books
                </Typography>
                <Slider
                  arrows={true}
                  dots={false}
                  swipe={true}
                  infinite={true}
                  slidesToShow={2}
                  slidesToScroll={1}>
                  {Object.keys(recommendations).map((bookTitle) => {
                    const book = recommendations[bookTitle];
                    return (
                      <Card key={bookTitle}>
                        <CardMedia
                          component='img'
                          height='200'
                          image={book && book['Image-URL-M']}
                          alt={bookTitle}
                        />
                        <CardContent>
                          <Typography
                            variant='h6'
                            component='div'
                            sx={{ mb: 1 }}>
                            {bookTitle}
                          </Typography>
                          <Typography variant='subtitle1' component='div'>
                            {book && book['Book-Author']}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Slider>
              </Box>
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant='h4' component='h2' sx={{ mb: 2 }}>
              Reviews
            </Typography>
            {product.reviews.length === 0 ? (
              <Message variant='info'>No Reviews</Message>
            ) : (
              <CardContent>
                {product.reviews.map((review) => (
                  <Box key={review._id} sx={{ mb: 3 }}>
                    <Typography variant='subtitle1' component='div'>
                      <strong>{review.name}</strong>
                    </Typography>
                    <Rating value={review.rating} color={'#f8e825'} />
                    <Typography variant='subtitle1' component='div'>
                      {review.createdAt.substring(0, 10)}
                    </Typography>
                    <Typography variant='body1' component='p' sx={{ mb: 2 }}>
                      {review.comment}
                    </Typography>
                  </Box>
                ))}
                <Typography variant='h4' component='h2' sx={{ mb: 2 }}>
                  Write a Customer Review
                </Typography>
                {loadingProductReview && <Loader />}
                {successProductReview && (
                  <Message variant='success'>
                    Review submitted successfully
                  </Message>
                )}
                {errorProductReview && (
                  <Message variant='danger'>{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Box component='form' onSubmit={submitHandler}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Rating</InputLabel>
                      <Select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value={1}>1 - Poor</MenuItem>
                        <MenuItem value={2}>2 - Fair</MenuItem>
                        <MenuItem value={3}>3 - Good</MenuItem>
                        <MenuItem value={4}>4 - Very Good</MenuItem>
                        <MenuItem value={5}>5 - Excellent</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      variant='outlined'
                      label='Comment'
                      fullWidth
                      multiline
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      size='large'
                      fullWidth>
                      Submit
                    </Button>
                  </Box>
                ) : (
                  <Message variant='info'>
                    Please <Link to='/login'>sign in</Link> to write a review
                  </Message>
                )}
              </CardContent>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductScreen;
