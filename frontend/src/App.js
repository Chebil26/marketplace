import { Row, Col, Container } from 'react-bootstrap';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

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

import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

import StoresScreen from './screens/StoresScreen';
import StoreDetailScreen from './screens/StoresDetailScreen';
import StoreContactScreen from './screens/StoreContactScreen';
import StoreBlogScreen from './screens/StoreBlogScreen';

import PostsListScreen from './screens/PostsListScreen';
import PostCreateScreen from './screens/PostCreateScreen';
import PostDetailScreen from './screens/PostDetailScreen';

function App() {
  return (
    <Router>
      <Header />
      <Row>
        <Col sm={1}>
          <SideBar />
        </Col>
        <Col sm={10}>
          <main>
            <Container>
              <Routes>
                <Route path='/' Component={HomeScreen} exact />
                <Route path='/login' Component={LoginScreen} />
                <Route path='/register' Component={RegisterScreen} />
                <Route path='/profile' Component={ProfileScreen} />

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

                <Route path='/stores' Component={StoresScreen} />
                <Route path='/stores/:id' Component={StoreDetailScreen} />
                <Route
                  path='/stores/:id/contact'
                  Component={StoreContactScreen}
                />
                <Route path='/stores/:id/blog' Component={StoreBlogScreen} />

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
  );
}

export default App;
