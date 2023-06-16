import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createProduct } from '../actions/productActions';
import { logout } from '../actions/userActions';
import { listStoreByUser } from '../actions/storeActions';
import { useNavigate } from 'react-router-dom';
import {
  Assignment as AssignmentIcon,
  ShoppingCart as ShoppingCartIcon,
  Create as CreateIcon,
  Book as BookIcon,
  ExitToApp as ExitToAppIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const StyledButton = styled(Button)`
  && {
    width: 100%;
    padding: 1.5rem;
    border-radius: 10px;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
`;

const AdminScreen = () => {
  let history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const storeByUser = useSelector((state) => state.storeByUser);
  const { store } = storeByUser;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else {
      if (!userInfo.isAdmin) {
        history('/login');
      } else {
        dispatch(listStoreByUser());
      }
    }

    dispatch(listStoreByUser());
  }, [dispatch]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth='md'>
      <Box mt={4} mb={2}>
        <Typography variant='h4' align='center'>
          Admin Dashboard
        </Typography>
      </Box>

      <List component='nav'>
        <ListItem button component={Link} to='/admin/productlist'>
          <StyledButton variant='contained' color='primary'>
            <IconButton color='inherit'>
              <AssignmentIcon />
            </IconButton>
            <Typography variant='subtitle1'>Products</Typography>
          </StyledButton>
        </ListItem>
        <ListItem button component={Link} to='/admin/orders'>
          <StyledButton variant='contained' color='secondary'>
            <IconButton color='inherit'>
              <ShoppingCartIcon />
            </IconButton>
            <Typography variant='subtitle1'>Orders</Typography>
          </StyledButton>
        </ListItem>
        <ListItem button component={Link} to='/blog'>
          <StyledButton variant='contained' color='warning'>
            <IconButton color='inherit'>
              <CreateIcon />
            </IconButton>
            <Typography variant='subtitle1'>Blog</Typography>
          </StyledButton>
        </ListItem>

        <ListItem>
          <StyledButton
            variant='contained'
            color='success'
            onClick={createProductHandler}
            fullWidth>
            <IconButton color='inherit'>
              <AddIcon />
            </IconButton>
            <Typography variant='subtitle1'>Create a Book</Typography>
          </StyledButton>
        </ListItem>

        <ListItem button component={Link} to={`/stores/${store.id}`}>
          <StyledButton variant='contained' color='error'>
            <IconButton color='inherit'>
              <BookIcon />
            </IconButton>
            <Typography variant='subtitle1'>{store.name}'s View</Typography>
          </StyledButton>
        </ListItem>
      </List>

      <Box textAlign='center' mt={4}>
        <Button
          variant='contained'
          startIcon={<ExitToAppIcon />}
          onClick={logoutHandler}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default AdminScreen;

// import React from 'react';
// import { styled } from '@mui/system';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Divider,
//   Container,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   ShoppingCart as ShoppingCartIcon,
//   People as PeopleIcon,
//   LibraryBooks as LibraryBooksIcon,
// } from '@mui/icons-material';

// const drawerWidth = 240;

// const Root = styled('div')(({ theme }) => ({
//   display: 'flex',
// }));

// const AppBarStyled = styled(AppBar)(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
// }));

// const DrawerStyled = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
// }));

// const DrawerPaperStyled = styled('div')(({ theme }) => ({
//   width: drawerWidth,
// }));

// const DrawerContainerStyled = styled('div')(({ theme }) => ({
//   overflow: 'auto',
// }));

// const Content = styled('main')(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   marginLeft: drawerWidth, // Added marginLeft to push content to the right
// }));

// const AdminDashboard = () => {
//   const [open, setOpen] = React.useState(true); // Set the initial state of the drawer to open

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <Root>
//       <AppBarStyled position='fixed'>
//         <Toolbar>
//           <IconButton
//             color='inherit'
//             aria-label='open drawer'
//             edge='start'
//             onClick={handleDrawerToggle}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant='h6' noWrap>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBarStyled>
//       <DrawerStyled variant='permanent' open={open}>
//         <Toolbar />
//         <DrawerContainerStyled>
//           <List>
//             <ListItem button>
//               <ListItemIcon>
//                 <DashboardIcon />
//               </ListItemIcon>
//               <ListItemText primary='Dashboard' />
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 <ShoppingCartIcon />
//               </ListItemIcon>
//               <ListItemText primary='Orders' />
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 <PeopleIcon />
//               </ListItemIcon>
//               <ListItemText primary='Customers' />
//             </ListItem>
//             <ListItem button>
//               <ListItemIcon>
//                 <LibraryBooksIcon />
//               </ListItemIcon>
//               <ListItemText primary='Products' />
//             </ListItem>
//           </List>
//           <Divider />
//           {/* Additional list items for other sections */}
//         </DrawerContainerStyled>
//       </DrawerStyled>
//       <Content>
//         <Toolbar />
//         <Container maxWidth='lg'>
//           {/* Content of the admin dashboard */}
//           <Typography variant='h4' gutterBottom>
//             Welcome to the Admin Dashboard!
//           </Typography>
//           <Typography variant='body1'>
//             This is the main content area where you can display various
//             admin-related information, charts, tables, etc.
//           </Typography>
//         </Container>
//       </Content>
//     </Root>
//   );
// };

// export default AdminDashboard;
