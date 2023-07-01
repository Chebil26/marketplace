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
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';

import { SupervisorAccount } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';
import FeedIcon from '@mui/icons-material/Feed';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

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
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
`;

const StyledTypography = styled(Typography)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  text-transform: none;
  margin-right: 0.2rem;
`;

function Header() {
  const logoLink =
    'https://firebasestorage.googleapis.com/v0/b/adeem-9a87d.appspot.com/o/white-logo.png?alt=media&token=5fb4e70d-3e3c-4ba1-b198-72448d9b1a47';
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

  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header>
      <StyledAppBar position='static'>
        <Container>
          <Toolbar>
            <StyledLink to='/'>
              <Avatar
                src={logoLink}
                alt='Adeem Logo'
                sx={{ width: 70, height: 70 }}
              />
              <StyledTypography variant='h6' component='div'>
                Adeem
              </StyledTypography>
            </StyledLink>

            {isSmallScreen && (
              <IconButton
                color='inherit'
                edge='start'
                onClick={toggleDrawer}
                sx={{ display: { md: 'none' } }}>
                <MenuIcon />
              </IconButton>
            )}

            {!isSmallScreen && (
              <>
                <StyledLink to='/stores'>
                  <StyledButton color='inherit'>
                    <StoreIcon />
                    Stores
                  </StyledButton>
                </StyledLink>

                <StyledLink to='/posts'>
                  <StyledButton color='inherit'>
                    <FeedIcon />
                    Blogs
                  </StyledButton>
                </StyledLink>

                <StyledLink to='/cart'>
                  <StyledButton color='inherit'>
                    <BookmarksIcon />
                    My books
                  </StyledButton>
                </StyledLink>
              </>
            )}

            <SearchBox />
            {userInfo && userInfo.isAdmin && (
              <Box padding={2}>
                <StyledLink to='/admin'>
                  <StyledButton color='inherit'>
                    <SupervisorAccount />
                    Admin Panel
                  </StyledButton>
                </StyledLink>
              </Box>
            )}

            {userInfo ? (
              <div>
                <StyledButton
                  color='inherit'
                  onClick={handleClick}
                  endIcon={<i className='fas fa-caret-down'></i>}>
                  <Person2Icon />
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
                  <MenuItem onClick={logoutHandler}>
                    <LogoutIcon /> Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <StyledLink to='/login'>
                {!isSmallScreen && (
                  <StyledButton color='inherit' style={{ marginLeft: '6rem' }}>
                    <i className='fas fa-user'></i> Login
                  </StyledButton>
                )}
                {isSmallScreen && (
                  <IconButton color='inherit'>
                    <i className='fas fa-user'></i>
                  </IconButton>
                )}
              </StyledLink>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Drawer */}
      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }} onClick={toggleDrawer}>
          <ListItem button component={Link} to='/'>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button component={Link} to='/stores'>
            <ListItemText primary='Stores' />
          </ListItem>
          <ListItem button component={Link} to='/posts'>
            <ListItemText primary='Blogs' />
          </ListItem>
          <ListItem button component={Link} to='/cart'>
            <ListItemText primary='My books' />
          </ListItem>
          {userInfo && userInfo.isAdmin && (
            <ListItem button component={Link} to='/admin'>
              <ListItemText primary='Admin Panel' />
            </ListItem>
          )}
          {userInfo ? (
            <>
              <ListItem button component={Link} to='/profile'>
                <ListItemText primary='Profile' />
              </ListItem>
              <ListItem button onClick={logoutHandler}>
                <ListItemText primary='Logout' />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to='/login'>
              <ListItemText primary='Login' />
            </ListItem>
          )}

          <SearchBox />
        </List>
      </Drawer>
    </header>
  );
}

export default Header;
