import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

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
  let history = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [hasReadingChallenge, setHasReadingChallenge] = useState(false);

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
        setName(user.name);
        setEmail(user.email);
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
    <Row>
      <Col>
        {!readingChallenge && (
          <Button className='my-3' onClick={createReadingChallengeHandler}>
            <i className='fas fa-plus'></i> Set Reading challenge
          </Button>
        )}

        {readingChallenge && (
          <ReadingChallenge readingChallenge={readingChallenge} />
        )}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        <h2>User Data</h2>
        <Card md={3} className='my-3 p-3 rounded' style={{ width: '30rem' }}>
          <Card.Title as='h4'>
            <strong>{name}</strong>
          </Card.Title>
          <Card.Title as='h4'>
            <strong>{email}</strong>
          </Card.Title>
        </Card>
      </Col>
      <Col>
        <h2>Update</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='passwordConfirm'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
