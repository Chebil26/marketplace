import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchWishlistDetail } from '../actions/wishlistActions';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const WishlistDetailScreen = () => {
  const dispatch = useDispatch();
  const fetchWishlistDetailState = useSelector(
    (state) => state.WishlistFetchDetail
  );

  const { wishlist, error } = fetchWishlistDetailState;
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchWishlistDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      {wishlist ? (
        <div>
          <Typography variant='h2'>Book Wishlist Detail</Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Name: ${wishlist.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Book: ${wishlist.book}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Author: ${wishlist.author}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`ISBN: ${wishlist.isbn}`} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Published Year: ${wishlist.publishedYear}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Default Image: ${wishlist.defaultImage}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Publisher: ${wishlist.publisher}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Category: ${wishlist.category}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Description: ${wishlist.description}`} />
            </ListItem>
          </List>
        </div>
      ) : (
        <Typography variant='p'>Loading...</Typography>
      )}
      {error && <Typography variant='p'>Error: {error}</Typography>}
    </div>
  );
};

export default WishlistDetailScreen;
