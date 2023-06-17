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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  IconButton,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createProductReview,
  listProductDetails,
  getSimilarProducts,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import Review from '../components/Review';
import CustomNextArrow from '../components/CustomNextArrow';
import CustomPrevArrow from '../components/CustomPrevArrow';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { getBookRecommendations } from '../actions/recommendationActions';
import { createOrder } from '../actions/orderActions';

const ProductScreen = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  // const similarProducts = useSelector((state) => state.similarProducts);
  // const {
  //   loading: loadingSimilarProducts,
  //   error: errorSimilarProducts,
  //   aa,
  // } = similarProducts;
  let { products } = useSelector((state) => state.similarProducts);
  if (product.isbn == 9999999999999) {
    products = [];
  }
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    if (product) {
      dispatch(getBookRecommendations(product.name));
      dispatch(getSimilarProducts(product.isbn));
    }
    console.log(products);

    return () => {
      // Clear the recommendations state after using it
      dispatch({ type: 'CLEAR_BOOK_RECOMMENDATIONS' });
    };
  }, [dispatch, id, successProductReview, product.name, product.isbn]);

  console.log(products);

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

  const handleCreateOrder = () => {
    setOpenDialog(true);
  };

  const handleConfirmOrder = () => {
    setOpenDialog(false);
    // Create the order by dispatching the action
    const orderData = {
      product: product._id, // or the appropriate identifier for the product
      store: product.store_id,
      user: userInfo.id, // or the appropriate identifier for the store
      // Add other necessary data for the order
    };
    dispatch(createOrder(orderData));
    setOrderPlaced(true); // Set the order placement status to true
  };

  const handleCancelOrder = () => {
    setOpenDialog(false);
  };

  const recommendationHandler = (author) => {
    const url = `/?keyword=${encodeURIComponent(author)}&page=1`;
    navigate(url);
  };

  return (
    <Container>
      <Button
        variant='contained'
        color='inherit'
        sx={{ marginBottom: 3, marginTop: '10px' }}
        onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ marginRight: '0.5rem' }} />
        Go back
      </Button>
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

            {/* {loadingSimilarProducts ? (
              <Loader />
            ) : errorSimilarProducts ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <> */}
            {products.length === 0 ? (
              <Message variant='info'>No similar products found.</Message>
            ) : (
              <Box sx={{ mt: 2, marginBottom: 5 }}>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Books Stores who sell:{' '}
                  <Typography color='green'>{product.name}</Typography>
                </Typography>
                <Slider
                  arrows={true}
                  dots={true}
                  swipe={true}
                  infinite={true}
                  autoplaySpeed={2500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  responsive={[
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                      },
                    },
                  ]}
                  // prevArrow={<CustomPrevArrow />} // Add custom previous arrow
                  nextArrow={<CustomNextArrow />} // Add custom next arrow
                >
                  {products.map((product) => (
                    <Box
                      key={product.id}
                      display='flex'
                      alignItems='center'
                      marginBottom={2}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '1rem',
                        }}>
                        {product.store_image && (
                          <IconButton
                            onClick={() =>
                              navigate(`/stores/${product.store_id}`)
                            }
                            sx={{
                              padding: 0,
                              marginRight: 1,
                            }}>
                            <CardMedia
                              component='img'
                              src={`${process.env.REACT_APP_API_SERVER}${product.store_image}`}
                              alt={product.store.name}
                              sx={{
                                height: 40,
                                width: 40,
                                borderRadius: '30%',
                              }}
                            />
                          </IconButton>
                        )}
                        <Button
                          variant='contained'
                          color='success'
                          onClick={() =>
                            navigate(`/stores/${product.store_id}`)
                          }>
                          {product.store}
                        </Button>
                      </Box>
                      <Product product={product} />
                    </Box>
                  ))}
                </Slider>
              </Box>
            )}
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

                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => navigate(`/stores/${product.store_id}`)}>
                  {product.store}
                </Button>

                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  Price: {product.price}DA
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
                  add to your booklist
                </Button>

                {userInfo ? (
                  <Button
                    variant='contained'
                    color='success'
                    size='large'
                    onClick={handleCreateOrder}
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={orderPlaced} // Disable the button if the order is already placed
                    style={{ opacity: orderPlaced ? 0.5 : 1 }} // Apply the fade effect
                  >
                    {orderPlaced ? 'Order Placed' : 'Place Order'}
                  </Button>
                ) : (
                  <Box sx={{ padding: '16px' }}>
                    <Message variant='info'>
                      Please <Link to='/login'>sign in</Link> to create an
                      order.
                    </Message>
                  </Box>
                )}
              </CardContent>
            </Card>
            {recommendations && Object.keys(recommendations).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                  You might also like
                </Typography>
                <Slider
                  arrows={true}
                  dots={true}
                  swipe={true}
                  infinite={true}
                  autoplaySpeed={2000}
                  slidesToShow={2}
                  slidesToScroll={1}
                  nextArrow={<CustomNextArrow />}
                  autoplay={true}>
                  {Object.keys(recommendations).map((bookTitle) => {
                    const book = recommendations[bookTitle];
                    const author = book && book['Book-Author'];

                    return (
                      <a
                        key={bookTitle}
                        href='#'
                        onClick={() => recommendationHandler(author)}>
                        <Card>
                          <CardMedia
                            component='img'
                            height='200'
                            image={book && book['Image-URL-M']}
                            alt={bookTitle}
                          />
                          <CardContent>
                            <Typography sx={{ mb: 1 }}>{bookTitle}</Typography>
                            <Typography variant='subtitle1' component='div'>
                              {author}
                            </Typography>
                          </CardContent>
                        </Card>
                      </a>
                    );
                  })}
                </Slider>
              </Box>
            )}
          </Grid>
          <Grid item md={6}>
            <Typography
              variant='h4'
              component='h2'
              sx={{ marginBottom: '1rem', fontWeight: 'bold', color: '#333' }}>
              Reviews
            </Typography>
            <CardContent>
              <Box>
                {product.reviews.length === 0 ? (
                  <Message variant='info'>No Reviews</Message>
                ) : (
                  product.reviews.map((review) => (
                    <Review key={review._id} review={review} />
                  ))
                )}
              </Box>
              <Typography variant='h4' component='h2' sx={{ mb: 2 }}>
                Write a Review
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
                    <Select
                      onChange={(e) => setRating(e.target.value)}
                      inputProps={{
                        name: 'rating',
                        id: 'rating-select',
                      }}>
                      <MenuItem value={1}>1 - Poor</MenuItem>
                      <MenuItem value={2}>2 - Fair</MenuItem>
                      <MenuItem value={3}>3 - Good</MenuItem>
                      <MenuItem value={4}>4 - Very Good</MenuItem>
                      <MenuItem value={5}>5 - Excellent</MenuItem>
                    </Select>
                    <InputLabel htmlFor='rating-select'>Rating</InputLabel>
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
                    inputProps={{
                      name: 'comment',
                      id: 'comment-input',
                    }}
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
          </Grid>
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCancelOrder}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <Typography variant='body1' component='p'>
            Are you sure you want to place this order?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelOrder} color='inherit'>
            Cancel
          </Button>
          <Button onClick={handleConfirmOrder} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductScreen;
