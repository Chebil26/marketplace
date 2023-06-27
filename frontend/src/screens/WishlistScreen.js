import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createWishlist,
  fetchWishlists,
  fetchWishlistDetail,
} from '../actions/wishlistActions';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';

import SelectBook from '../components/SelectBook';

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const createWishlistState = useSelector((state) => state.wishListCreate);
  const fetchWishlistsState = useSelector((state) => state.wishlistFetch);
  const fetchWishlistDetailState = useSelector(
    (state) => state.WishlistFetchDetail
  );

  const { wishlist, error } = fetchWishlistDetailState;
  const { wishlists } = fetchWishlistsState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [book, setBook] = useState('');

  const [name, setName] = useState('');
  const [defaultImage, setDefaultImage] = useState(null);
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  useEffect(() => {
    dispatch(fetchWishlists());

    if (book) {
      //decoding the image url and adding "http"
      let str = decodeURIComponent(book.image).substring(14);
      let image_link = 'http://' + str;
      //   setBook_id(book.id);
      setName(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setPublishedYear(book.published_year);
      setDescription(book.description);
      setDefaultImage(book.image);
      setCategory(book.categories);
      setPublisher(book.publisher);
    }
  }, [dispatch, book]);

  const handleCreateWishlist = () => {
    const wishlistData = {
      user: userInfo._id,
      name,
      defaultImage,
      publisher,
      category,
      description,
      author,
      isbn,
      publishedYear,
    };
    dispatch(createWishlist(wishlistData));
  };

  function handleDataFromChild(data) {
    setBook(data.value);
    console.log(data.value);
  }

  return (
    <div>
      <Typography variant='h2'>My Book Wishlist</Typography>

      <Typography variant='h3'>All Wishlists</Typography>
      <Box sx={{ marginTop: '1rem' }}>
        {wishlists.map((wishlist) => (
          <Card sx={{ marginTop: '1rem' }} key={wishlist._id}>
            <CardContent>
              <Typography variant='h5'>{wishlist.name}</Typography>
              <Typography variant='subtitle1'>
                Author: {wishlist.author}
              </Typography>
              <Typography variant='subtitle1'>
                Created At: {new Date(wishlist.createdAt).toLocaleDateString()}
              </Typography>
              {/* Add other wishlist fields as required */}
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography variant='h3'>Create Wishlist</Typography>
      <SelectBook sendDataToParent={handleDataFromChild} />
      <form>
        <TextField
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          label='Name'
          variant='outlined'
          placeholder='Name'
        />
        <TextField
          type='text'
          name='defaultImage'
          value={defaultImage}
          onChange={(e) => setDefaultImage(e.target.value)}
          label='Default Image URL'
          variant='outlined'
          placeholder='Default Image URL'
        />
        <TextField
          type='text'
          name='publisher'
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          label='Publisher'
          variant='outlined'
          placeholder='Publisher'
        />
        <TextField
          type='text'
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label='Category'
          variant='outlined'
          placeholder='Category'
        />
        <TextField
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label='Description'
          variant='outlined'
          multiline
          rows={4}
          placeholder='Description'
        />
        <TextField
          type='text'
          name='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          label='Author'
          variant='outlined'
          placeholder='Author'
        />
        <TextField
          type='text'
          name='isbn'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          label='ISBN'
          variant='outlined'
          placeholder='ISBN'
        />
        <TextField
          type='text'
          name='publishedYear'
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          label='Published Year'
          variant='outlined'
          placeholder='Published Year'
        />

        {/* Add other input fields for wishlist data */}
      </form>

      <Button variant='contained' onClick={handleCreateWishlist}>
        Create Wishlist
      </Button>
    </div>
  );
};

export default WishlistScreen;
