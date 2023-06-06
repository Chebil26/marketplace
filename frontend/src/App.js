import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
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
          <Header />
          <Grid container>
            <Grid item xs={12}>
              <Container>
                <Routes>
                  <Route path='/' element={<HomeScreen />} exact />
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
                  <Route
                    path='/stores/:id/blog'
                    element={<StoreBlogScreen />}
                  />

                  <Route path='/posts' element={<PostsListScreen />} />
                  <Route path='/blog' element={<PostCreateScreen />} />
                  <Route path='/posts/:id' element={<PostDetailScreen />} />
                </Routes>
              </Container>
            </Grid>
          </Grid>

          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
