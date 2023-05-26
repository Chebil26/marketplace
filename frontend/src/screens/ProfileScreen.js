import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';

import Loader from '../components/Loader';
import Message from '../components/Message';
import ReadingChallenge from '../components/ReadingChallenge';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import {
  createReadingChallenge,
  readingChallengeByUser,
} from '../actions/challengeActions';
function ProfileScreen() {
  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: '#f7f7f7',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
      cursor: 'pointer',
    },
  }));
  let history = useNavigate();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [hasReadingChallenge, setHasReadingChallenge] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const readingChallengeDetails = useSelector(
    (state) => state.readingChallengeDetails
  );
  const {
    loading: loadingReadingChallenge,
    error: errorReadingChallenge,
    readingChallenge,
  } = readingChallengeDetails;

  const readingChallengeCreate = useSelector(
    (state) => state.readingChallengeCreate
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    readingChallenge: createdReadingChallenge,
  } = readingChallengeCreate;

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else {
      dispatch(readingChallengeByUser());
      if (successCreate) {
        setHasReadingChallenge(true);
        dispatch(readingChallengeByUser());
        // history(`/`)
      }
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        if (successCreate) {
          history(`/`);
        }
      } else {
        setName(userInfo.name);
        setUserName(userInfo.username);
        setEmail(userInfo.email);
      }
    }
  }, [dispatch, history, userInfo, user, success, successCreate]);

  console.log(readingChallenge);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          'id:': user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage('');
    }
  };

  const createReadingChallengeHandler = () => {
    dispatch(createReadingChallenge());
  };

  return (
    <Grid container spacing={3} direction='column'>
      <Grid item>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StyledBox>
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 150, height: 150, mb: 3 }}
            />
            <Typography variant='h3' component='h1' gutterBottom>
              {user.name}
            </Typography>
            <Typography variant='h5' gutterBottom color='primary'>
              @{user.username}
            </Typography>
            <Typography variant='body1' gutterBottom>
              {user.bio}
            </Typography>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              Location: {user.location}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Email: {user.email}
            </Typography>
          </StyledBox>
        )}
      </Grid>

      <Grid item>
        <Button
          onClick={toggleEditMode}
          size='large'
          sx={{ mt: 3, mb: 3, px: 4, py: 2, fontSize: '1.5rem' }}
          variant='contained'>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </Button>
        {editMode && (
          <div>
            <Typography variant='h4'>Update</Typography>
            {message && (
              <Typography variant='body1' color='error'>
                {message}
              </Typography>
            )}

            <form onSubmit={submitHandler}>
              <TextField
                required
                fullWidth
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin='normal'
              />
              <TextField
                required
                fullWidth
                label='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin='normal'
              />
              <TextField
                type='password'
                fullWidth
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin='normal'
              />
              <TextField
                type='password'
                fullWidth
                label='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin='normal'
              />
              <Button type='submit' variant='contained' color='primary'>
                Update
              </Button>
            </form>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default ProfileScreen;
