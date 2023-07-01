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
    <AppBar
      position='static'
      sx={{
        bgcolor: 'rgba(77, 134, 219, 0)',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      }}
      elevation={0}>
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
          <Typography
            variant='h6'
            component='div'
            sx={{ pr: 2, color: 'black' }}>
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
            color='inherit'
            sx={{ color: 'black' }}>
            Contact
          </Button>
          <Button
            component={Link}
            to={`/stores/${store.id}/blog`}
            color='inherit'
            sx={{ color: 'black' }}>
            Blog
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StoreHeader;
