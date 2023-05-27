import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  CardMedia,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { listStoreDetails } from '../actions/storeActions';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import StoreHeader from '../components/StoreHeader';

function StoreDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const storeDetails = useSelector((state) => state.storeDetails);
  const { error, loading, store } = storeDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  useEffect(() => {
    dispatch(listStoreDetails(id));
    dispatch(listProducts());
  }, [dispatch]);

  const storeProducts = products.filter(
    (product) => product.store === store.name
  );

  if (loading || loadingProducts || !store) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StoreHeader />
      <Box my={3} p={3} borderRadius={4} boxShadow={1} maxWidth={600}>
        <Box display='flex' alignItems='center'>
          {store.image && (
            <CardMedia
              component='img'
              src={`${process.env.REACT_APP_API_SERVER}${store.image}`}
              alt={store.name}
              sx={{ width: 200, height: 200, borderRadius: '10%', mr: 2 }}
            />
          )}
          <div>
            <Typography variant='h4' component='h1' color='primary'>
              <strong>{store.name}</strong>
            </Typography>
            <Typography variant='h6' component='h4'>
              <strong>from {store.wilaya}</strong>
            </Typography>
          </div>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <Typography variant='h6' component='h6' color='primary'>
                Description
              </Typography>
              <Typography variant='body1'>{store.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box my={3}>
        <Typography
          variant='h4'
          component='h4'
          color='primary'
          marginBottom={2}>
          {store.name}'s Products
        </Typography>
        <Divider />
        <Grid container spacing={3}>
          {storeProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default StoreDetailScreen;
