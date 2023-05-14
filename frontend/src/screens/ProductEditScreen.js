import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Col, Row, Image } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import SelectBook from '../components/SelectBook';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen() {
  // const productId = match.params.id
  let history = useNavigate();
  const { id } = useParams();
  const productId = id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [defaultImage, setDefaultImage] = useState(null);
  const [language, setLanguage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [available, setAvailable] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [published_year, setPublished_year] = useState('');
  const [num_pages, setNum_pages] = useState('');

  const [book, setBook] = useState('');
  const [book_id, setBook_id] = useState(0);

  function handleDataFromChild(data) {
    setBook(data.value);
  }
  useEffect(() => {
    if (book) {
      //decoding the image url and adding "http"
      let str = decodeURIComponent(book.cover).substring(14);
      let image_link = 'http://' + str;
      setBook_id(book.id);
      setName(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setPublished_year(book.published_year);
      setNum_pages(book.num_pages);
      setDescription(book.description);
      setImage(image_link);
      setDefaultImage(image_link);
      setCategory(book.categories);
    }
  }, [book]);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history('/admin/productlist');
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setLanguage(product.language);
        setPrice(product.price);
        setImage(product.defaultImage);
        // setDefaultImage(product.image)
        setPublisher(product.publisher);
        setCategory(product.category);
        setAvailable(product.available);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const handleCheckboxChange = (e) => {
    setAvailable(e.target.checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(defaultImage);
    dispatch(
      updateProduct({
        _id: productId,
        book_id,
        name,
        language,
        image,
        defaultImage,
        isbn,
        author,
        num_pages,
        published_year,
        publisher,
        category,
        description,
        price,
        available,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    formData.append('product_id', productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/products/upload/`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to='/admin/productlist'>Go Back</Link>
      <SelectBook sendDataToParent={handleDataFromChild} />

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <h3>Loaded Data from | the book: </h3>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='author'>
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='isbn'>
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter ISBN'
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='published_year'>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter Year'
                    value={published_year}
                    onChange={(e) =>
                      setPublished_year(e.target.value)
                    }></Form.Control>
                </Form.Group>

                <Image className='m-2' src={defaultImage} alt={name} fluid />

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='5'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <h3>Your Own Data: </h3>
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='exampleForm.SelectCustom'>
                  <Form.Label>Select the language</Form.Label>
                  <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}>
                    <option value='FR'>french</option>
                    <option value='EN'>english</option>
                    <option value='AR'>arabic</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId='countinstock'>
                  <Form.Label>Availability</Form.Label>

                  <Form.Check
                    type='checkbox'
                    label='Set to available'
                    checked={available}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>

                <Form.Group controlId='publisher'>
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Publisher'
                    value={publisher}
                    onChange={(e) =>
                      setPublisher(e.target.value)
                    }></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Or you can choose your own cover</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}></Form.Control>

                  <Form.Group className='mb-3'>
                    <Form.Label>Choose File</Form.Label>
                    <Form.Control
                      type='file'
                      id='image-file'
                      custom
                      onChange={uploadFileHandler}
                    />
                  </Form.Group>

                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
