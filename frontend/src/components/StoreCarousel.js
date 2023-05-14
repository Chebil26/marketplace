import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

function StoreCarousel() {
  const dispatch = useDispatch();

  const storeList = useSelector((state) => state.storeList);
  const { error, loading, stores } = storeList;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-light' variant='dark'>
      {stores.map((store) => (
        <Carousel.Item key={store.id}>
          <Link to={`/store/${store.id}`}>
            <Image src={store.image} alt={store.name} fluid />
            <Carousel.Caption className='carousel.caption'>
              <h4 className='text-secondary'>{store.name}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default StoreCarousel;
