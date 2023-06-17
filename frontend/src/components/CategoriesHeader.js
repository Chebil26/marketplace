import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { createProduct } from '../actions/productActions';
import { logout } from '../actions/userActions';
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
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleCollapse = () => {
    setDrawerOpen(false);
  };

  return (
    <header>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Container maxWidth='lg'>
            <nav style={{ display: 'flex', alignItems: 'center' }}>
              {isSmallScreen && (
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={handleDrawerOpen}>
                  <MenuIcon /> Categories
                </IconButton>
              )}
              {!isSmallScreen &&
                categories.map((category, index) => (
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
                        textTransform: 'none',
                      }}
                      onClick={() => filterHandler(category)}>
                      {category}
                    </Button>
                  </React.Fragment>
                ))}
            </nav>
            {isDrawerOpen && (
              <Button
                variant='contained'
                color='secondary'
                onClick={handleCollapse}
                style={{ marginTop: '10px' }}>
                Return
              </Button>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={isDrawerOpen} onClose={handleDrawerClose}>
        <div
          role='presentation'
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}>
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
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    filterHandler(category);
                    handleDrawerClose();
                  }}>
                  {category}
                </Button>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </Drawer>
    </header>
  );
}

export default CategoriesHeader;
