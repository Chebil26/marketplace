import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const redirect = window.location.search
    ? window.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant='h4' align='center'>
          Register
        </Typography>
      </Box>
      <FormContainer>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Box component='form' onSubmit={submitHandler} sx={{ mt: 3 }}>
          <TextField
            id='name'
            label='Name'
            type='name'
            variant='outlined'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />
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
          <TextField
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            variant='outlined'
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Register
          </Button>
        </Box>
        <Box sx={{ py: 3 }}>
          <Typography variant='body1' component='p'>
            Have an Account?{' '}
            <RouterLink
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              style={{ textDecoration: 'none' }}>
              Sign In
            </RouterLink>
          </Typography>
        </Box>
      </FormContainer>
    </Container>
  );
}

export default RegisterScreen;
