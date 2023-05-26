import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  MenuItem,
  Menu,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { logout } from '../actions/userActions';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import SearchBox from './SearchBox';

const StyledAppBar = styled(AppBar)`
  background-color: #185b89;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
`;

const StyledTypography = styled(Typography)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  text-transform: none;
  margin-right: 1rem;
`;

function Header() {
  const navigate = useNavigate();
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
      navigate(`/admin/product/edit/${createdProduct._id}`);
    }
  }, [dispatch, navigate, successCreate, createdProduct]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  // Dropdown Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <StyledAppBar position='static'>
        <Container>
          <Toolbar>
            <StyledLink to='/'>
              <StyledTypography variant='h6' component='div'>
                Adeem
              </StyledTypography>
            </StyledLink>
            <StyledLink to='/cart'>
              <StyledButton color='inherit'>
                <i className='fas fa-shopping-cart'></i> Saved
              </StyledButton>
            </StyledLink>
            {userInfo ? (
              <div>
                <StyledButton
                  color='inherit'
                  onClick={handleClick}
                  endIcon={<i className='fas fa-caret-down'></i>}>
                  {userInfo.name}
                </StyledButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  getContentAnchorEl={null}>
                  <MenuItem
                    component={Link}
                    to='/profile'
                    onClick={handleClose}>
                    <i className='fas fa-user'></i> Profile
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <StyledLink to='/login'>
                <StyledButton color='inherit'>
                  <i className='fas fa-user'></i> Login
                </StyledButton>
              </StyledLink>
            )}
            <StyledLink to='/stores'>
              <StyledButton color='inherit'>Stores</StyledButton>
            </StyledLink>
            <StyledLink to='/posts'>
              <StyledButton color='inherit'>Blogs</StyledButton>
            </StyledLink>
            <SearchBox />
            {userInfo && userInfo.isAdmin && (
              <div>
                <StyledLink to='/admin/productlist'>
                  <StyledButton color='inherit'>My Products</StyledButton>
                </StyledLink>
                <StyledLink to='/blog'>
                  <StyledButton color='inherit'>My Blog</StyledButton>
                </StyledLink>
                <StyledLink to={`/stores/${store.id}`}>
                  <StyledButton color='inherit'>{store.name}</StyledButton>
                </StyledLink>
                <StyledButton
                  variant='contained'
                  color='success'
                  onClick={createProductHandler}>
                  <i className='fas fa-plus'></i> Create
                </StyledButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
    </header>
  );
}

export default Header;
