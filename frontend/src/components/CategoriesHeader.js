import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function CategoriesHeader({ categories, filterHandler, clearHandler }) {
  //   const categories = [
  //     'Fiction',
  //     'Mystery',
  //     'Science Fiction',
  //     'Fantasy',
  //     'Romance',
  //   ];

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
      {/* Add subheader */}
      <Navbar
        bg='light'
        variant='light'
        style={{ height: '50px' }}
        collapseOnSelect>
        <Container>
          <Nav
            className='d-flex align-items-center justify-content-center'
            style={{ width: '100%' }}>
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
                <Nav.Link
                  style={{
                    marginRight: '10px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => filterHandler(category)}>
                  {category}
                </Nav.Link>
              </React.Fragment>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default CategoriesHeader;
