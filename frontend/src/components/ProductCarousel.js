import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  let productsInSetsOfThree = [];
  if (products.length > 0) {
    for (let i = 0; i < products.length; i += 3) {
      const productSet = products.slice(i, i + 3);
      productsInSetsOfThree.push(productSet);
    }
  }

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <Carousel pause='hover' className='bg-light' variant='dark'>
      {productsInSetsOfThree.map((productSet, index) => (
        <Carousel.Item key={index}>
          <div className='d-flex justify-content-around'>
            {productSet.map((product) => (
              <div key={product._id} className='text-center product-item'>
                <Link to={`/product/${product._id}`}>
                  <Image
                    src={`${process.env.REACT_APP_API_SERVER}${product.image}`}
                    alt={product.name}
                    fluid
                    className='product-image'
                  />
                </Link>
                <div className='product-details'>
                  <h4 className='product-name'>
                    <Link
                      to={`/product/${product._id}`}
                      className='text-secondary'>
                      {product.name}
                    </Link>
                  </h4>
                  <span className='product-price'>{product.price} DA</span>
                </div>
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
