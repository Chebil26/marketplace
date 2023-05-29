import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@mui/material';
// import { getStoreOrders } from '../actions/orderActions';

function AdminOrdersListScreen() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //   const storeOrders = useSelector((state) => state.storeOrders);
  //   const { loading, orders, error } = storeOrders;

  //   useEffect(() => {
  //     if (userInfo && userInfo.isStoreOwner) {
  //       dispatch(getStoreOrders());
  //     } else {
  //       history('/login');
  //     }
  //   }, [dispatch, userInfo, history]);
  const orders = {};

  return (
    <Container>
      <TableContainer component={Paper}>
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>{order.product.price} DA</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.totalPrice} DA</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </TableContainer>
      </TableContainer>

      <Box sx={{ marginTop: '2rem' }}>
        <Button variant='contained' onClick={() => history.push('/')} fullWidth>
          Go Back
        </Button>
      </Box>
    </Container>
  );
}

export default AdminOrdersListScreen;
