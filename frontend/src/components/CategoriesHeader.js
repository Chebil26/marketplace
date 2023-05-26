import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function CategoriesHeader({ categories, filterHandler, clearHandler }) {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const storeByUser = useSelector((state) => state.storeByUser);
  const { store } = storeByUser;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      history(`/admin/product/edit/${createdProduct._id}/`);
    }
  }, [dispatch, history, successCreate, createdProduct]);

  const logoutHandler = () => {
    dispatch(logout());
    history('/');
  };

  const createProductHandler = (product) => {
    dispatch(createProduct());
  };

  return (
    <header>
      <AppBar
        position='static'
        color='default'
        style={{ width: '100%', height: 55 }}>
        <Toolbar>
          <Container maxWidth='lg'>
            <nav>
              {categories.map((category, index) => (
                <React.Fragment key={category}>
                  {index !== 0 && (
                    <span
                      style={{
                        margin: '0 5px',
                        borderLeft: '1px solid black',
                        height: '14px',
                        display: 'inline-block',
                      }}></span>
                  )}
                  <Button
                    variant='text'
                    color='inherit'
                    style={{
                      marginRight: '10px',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => filterHandler(category)}>
                    {category}
                  </Button>
                </React.Fragment>
              ))}
            </nav>
          </Container>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default CategoriesHeader;
