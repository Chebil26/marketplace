import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import StoreHeader from '../components/StoreHeader';

const StoreContactScreen = () => {
  const storeDetails = useSelector((state) => state.storeDetails);
  const { error, loading, store } = storeDetails;

  return (
    <>
      <StoreHeader />
      <Container>
        <Row className='mt-5'>
          <Col md={6} className='mb-4'>
            <Card className='border-0'>
              <Card.Body>
                <Card.Title className='h4 text-primary font-weight-bold'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
                  Address
                </Card.Title>
                <Card.Text>{store.address}</Card.Text>
              </Card.Body>
            </Card>
            <Card className='border-0'>
              <Card.Body>
                <Card.Title className='h4 text-primary font-weight-bold '>
                  <FontAwesomeIcon icon={faPhoneAlt} className='mr-2' />
                  Phone
                </Card.Title>
                <Card.Text>{store.phone_number}</Card.Text>
              </Card.Body>
            </Card>
            <Card className='border-0'>
              <Card.Body>
                <Card.Title className='h4 text-primary font-weight-bold'>
                  <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
                  Email
                </Card.Title>
                <Card.Text>{store.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <h2>Contact Us</h2>
            <p>
              Please use the form below to contact us with any questions or
              concerns.
            </p>
            <Form>
              <Form.Group controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter your name' />
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter your email' />
              </Form.Group>
              <Form.Group controlId='formBasicMessage'>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  placeholder='Enter your message'
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StoreContactScreen;
