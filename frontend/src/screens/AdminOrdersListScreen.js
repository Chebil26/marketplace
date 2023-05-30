import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { listOrders } from '../actions/orderActions';

const AdminOrdersListScreen = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(
      new Date(dateString)
    );
  };

  return (
    <div>
      <Typography variant='h2' component='h2' gutterBottom>
        Admin Orders
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant='body1' color='error'>
          Error: {error}
        </Typography>
      ) : userInfo && userInfo.isAdmin ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.username}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{order.isPaid ? 'Paid' : 'Not Paid'}</TableCell>
                  <TableCell>
                    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/orders/${order.id}`}>Details</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant='body1' color='textSecondary'>
          You are not authorized to view this page.
        </Typography>
      )}
    </div>
  );
};

export default AdminOrdersListScreen;
