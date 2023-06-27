import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Container, Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';

import BookDetailScreen from './screens/BookDetailScreen';
import BooksScreen from './screens/BooksScreen';

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserProfileScreen from './screens/UserProfileScreen';

import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';

import AdminScreen from './screens/AdminScreen';

import StoreBlogScreen from './screens/StoreBlogScreen';
import StoreContactScreen from './screens/StoreContactScreen';
import StoreDetailScreen from './screens/StoresDetailScreen';
import StoresScreen from './screens/StoresScreen';

import AdminOrdersListScreen from './screens/AdminOrdersListScreen';
import PostCreateScreen from './screens/PostCreateScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import PostsListScreen from './screens/PostsListScreen';
import WishlistScreen from './screens/WishlistScreen';
import WishlistDetailScreen from './screens/WishListDetailScreen';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5', // Replace with your desired background color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default }}>
        <Router>
          <Box position='sticky' top={0} zIndex={999}>
            <Header />
          </Box>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
          <Box width='100%' display='flex' justifyContent='center'>
            <Box width='100%' maxWidth='1200px' px={2}>
              <Routes>
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/user-profile' element={<UserProfileScreen />} />

                <Route path='/product/:id' element={<ProductScreen />} />

                <Route path='/cart/:id?' element={<CartScreen />} />
                {/* 
                <Route path='/books' element={<BooksScreen />} />
                <Route path='/books/:id' element={<BookDetailScreen />} /> */}

                <Route
                  path='/admin/productlist'
                  element={<ProductListScreen />}
                />
                <Route
                  path='/admin/product/edit/:id/'
                  element={<ProductEditScreen />}
                />
                <Route
                  path='/admin/orders'
                  element={<AdminOrdersListScreen />}
                />
                <Route path='/admin' element={<AdminScreen />} />

                <Route path='/stores' element={<StoresScreen />} />
                <Route path='/stores/:id' element={<StoreDetailScreen />} />

                <Route
                  path='/stores/:id/contact'
                  element={<StoreContactScreen />}
                />
                <Route path='/stores/:id/blog' element={<StoreBlogScreen />} />

                <Route path='/posts' element={<PostsListScreen />} />
                <Route path='/blog' element={<PostCreateScreen />} />
                <Route path='/posts/:id' element={<PostDetailScreen />} />

                <Route path='/wishlist' element={<WishlistScreen />} />
                <Route
                  path='/wishlist/:id'
                  element={<WishlistDetailScreen />}
                />
              </Routes>
            </Box>
          </Box>

          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
