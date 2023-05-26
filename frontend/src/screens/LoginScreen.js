import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

function LoginScreen({ location }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Typography variant='h3' component='h3'>
        Sign in
      </Typography>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Box component='form' onSubmit={submitHandler} sx={{ mt: 3 }}>
        <TextField
          id='email'
          label='Email Address'
          type='email'
          variant='outlined'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Sign in
        </Button>
      </Box>
      <Box sx={{ py: 3 }}>
        <Typography variant='body1' component='p'>
          New?{' '}
          <RouterLink
            to={redirect ? `/register?redirect=${redirect}` : '/login'}
            style={{ textDecoration: 'none' }}>
            Register
          </RouterLink>
        </Typography>
      </Box>
    </FormContainer>
  );
}

export default LoginScreen;
