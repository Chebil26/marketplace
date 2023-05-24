import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function Header({ filterHandler, clearHandler }) {
  const categories = [
    'Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Romance',
  ];

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
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Adeem</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Saved
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className='fas fa-user'></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to='/stores'>
                <Nav.Link>Stores</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/posts'>
                <Nav.Link>Blogs</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className='mx-auto'>
              <SearchBox />
            </Nav>

            <Nav className='justify-content-end'>
              {userInfo && userInfo.isAdmin && (
                <Nav>
                  <LinkContainer to='/admin/productlist'>
                    <Nav.Link>My Products</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/blog'>
                    <Nav.Link>My Blog</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`/stores/${store.id}`}>
                    <Nav.Link>{store.name}</Nav.Link>
                  </LinkContainer>

                  <Button
                    className='mx-3'
                    variant='secondary'
                    onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create
                  </Button>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add subheader */}
      {/* <Navbar
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
      </Navbar> */}
    </header>
  );
}

export default Header;
