import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CardMedia,
} from '@mui/material';

const StoreHeader = () => {
  const storeDetails = useSelector((state) => state.storeDetails);
  const { error, loading, store } = storeDetails;

  return (
    <AppBar position='static' sx={{ bgcolor: '#4D86DB' }}>
      <Toolbar>
        <Box>
          <CardMedia
            component='img'
            src={`${process.env.REACT_APP_API_SERVER}${store.image}`}
            alt={store.name}
            sx={{ height: 40, width: 40, borderRadius: '50%', marginRight: 1 }}
          />
        </Box>

        <Box>
          <Typography variant='h6' component='div' sx={{ pr: 2 }}>
            <Link
              to={`/stores/${store.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              {store.name}
            </Link>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            component={Link}
            to={`/stores/${store.id}/contact`}
            color='inherit'>
            Contact
          </Button>
          <Button
            component={Link}
            to={`/stores/${store.id}/blog`}
            color='inherit'>
            Blog
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StoreHeader;
