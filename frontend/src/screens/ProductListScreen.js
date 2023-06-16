import React, { useEffect, useState } from 'react';
import {
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  getProductsByStore,
} from '../actions/productActions';
import { listStoreByUser } from '../actions/storeActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const ProductListScreen = ({ match }) => {
  const history = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();

  const productByStore = useSelector((state) => state.productByStore);
  const { loading, error, products, pages, page } = productByStore;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const storeByUser = useSelector((state) => state.storeByUser);
  const { loading: loadingStore, error: errorStore, store } = storeByUser;

  const storeProducts = products
    .filter((product) => product.store === store.name)
    .filter((product) => {
      const { name, author, isbn, publisher } = product;
      return (
        (name?.toLowerCase()?.includes(searchKeyword.toLowerCase()) ?? false) ||
        (author?.toLowerCase()?.includes(searchKeyword.toLowerCase()) ??
          false) ||
        (isbn?.toLowerCase()?.includes(searchKeyword.toLowerCase()) ?? false) ||
        (publisher?.toLowerCase()?.includes(searchKeyword.toLowerCase()) ??
          false)
      );
    });

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history('/login');
    }

    if (successCreate) {
      history(`/admin/product/edit/${createdProduct._id}/`);
    } else {
      dispatch(getProductsByStore(store.id));
      dispatch(listStoreByUser());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Products
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={createProductHandler}
        style={{ marginBottom: '1rem' }}>
        Create Product
      </Button>
      <FormControl
        variant='outlined'
        fullWidth
        style={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor='search-products'>Search products</InputLabel>
        <OutlinedInput
          id='search-products'
          type='text'
          onChange={(e) => setSearchKeyword(e.target.value)}
          label='Search products'
          endAdornment={
            <InputAdornment position='end'>
              {/* You can add a search icon here if desired */}
              {/* <IconButton edge="end" aria-label="search">
                <SearchIcon />
              </IconButton> */}
            </InputAdornment>
          }
        />
      </FormControl>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <TableContainer>
          <Table striped bordered hover>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storeProducts.map((product, index) => (
                <TableRow
                  key={product._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2',
                  }}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}DA</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.available ? (
                      <Chip label='In Stock' color='success' />
                    ) : (
                      <Chip label='Out of Stock' color='error' />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/product/edit/${product._id}`}
                      className='btn btn-light btn-sm'>
                      Edit <i className='fas fa-edit'></i>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                      style={{ backgroundColor: '#CA0000', color: 'white' }}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ProductListScreen;
