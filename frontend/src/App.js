import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';

import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

import BooksScreen from './screens/BooksScreen';
import BookDetailScreen from './screens/BookDetailScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';

import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

import AdminScreen from './screens/AdminScreen';

import StoresScreen from './screens/StoresScreen';
import StoreDetailScreen from './screens/StoresDetailScreen';
import StoreContactScreen from './screens/StoreContactScreen';
import StoreBlogScreen from './screens/StoreBlogScreen';

import PostsListScreen from './screens/PostsListScreen';
import PostCreateScreen from './screens/PostCreateScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import AdminOrdersListScreen from './screens/AdminOrdersListScreen';

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
          <Row>
            <Col>
              <main>
                <Container>
                  <Routes>
                    <Route path='/' Component={HomeScreen} exact />
                    <Route path='/login' Component={LoginScreen} />
                    <Route path='/register' Component={RegisterScreen} />
                    <Route path='/profile' Component={ProfileScreen} />
                    <Route path='/user-profile' Component={UserProfileScreen} />

                    <Route path='/product/:id' Component={ProductScreen} />

                    <Route path='/cart/:id?' Component={CartScreen} />

                    <Route path='/books' Component={BooksScreen} />
                    <Route path='/books/:id' Component={BookDetailScreen} />

                    <Route
                      path='/admin/productlist'
                      Component={ProductListScreen}
                    />
                    <Route
                      path='/admin/product/edit/:id/'
                      Component={ProductEditScreen}
                    />
                    <Route
                      path='/admin/orders'
                      Component={AdminOrdersListScreen}
                    />
                    <Route path='/admin' Component={AdminScreen} />

                    <Route path='/stores' Component={StoresScreen} />
                    <Route path='/stores/:id' Component={StoreDetailScreen} />
                    <Route
                      path='/stores/:id/contact'
                      Component={StoreContactScreen}
                    />
                    <Route
                      path='/stores/:id/blog'
                      Component={StoreBlogScreen}
                    />

                    <Route path='/posts' Component={PostsListScreen} />
                    <Route path='/blog' Component={PostCreateScreen} />
                    <Route path='/posts/:id' Component={PostDetailScreen} />
                  </Routes>
                </Container>
              </main>
            </Col>
          </Row>

          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
