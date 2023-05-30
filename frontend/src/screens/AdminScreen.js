import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createProduct } from '../actions/productActions';
import { logout } from '../actions/userActions';
import { listStoreByUser } from '../actions/storeActions';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
  && {
    width: 100%;
    padding: 1.5rem;
    border-radius: 10px;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
`;

const AdminScreen = () => {
  let history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const storeByUser = useSelector((state) => state.storeByUser);
  const { store } = storeByUser;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else {
      if (!userInfo.isAdmin) {
        history('/login');
      } else {
        dispatch(listStoreByUser());
      }
    }

    dispatch(listStoreByUser());
  }, [dispatch]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth='md'>
      <Box mt={4} mb={2}>
        <Typography variant='h4' align='center'>
          Admin Dashboard
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to='/admin/productlist' style={{ textDecoration: 'none' }}>
            <StyledButton variant='contained' color='primary'>
              My Products
            </StyledButton>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to='/blog' style={{ textDecoration: 'none' }}>
            <StyledButton variant='contained' color='warning'>
              My Blog
            </StyledButton>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={`/stores/${store.id}`} style={{ textDecoration: 'none' }}>
            <StyledButton variant='contained' color='error'>
              {store.name}
            </StyledButton>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to='/admin/orders' style={{ textDecoration: 'none' }}>
            <StyledButton variant='contained' color='secondary'>
              Your Orders
            </StyledButton>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StyledButton
            variant='contained'
            color='success'
            onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create a Book
          </StyledButton>
        </Grid>
      </Grid>

      <Box textAlign='center' mt={4}>
        <Button variant='contained' onClick={logoutHandler}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default AdminScreen;
