import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Rating from '@mui/material/Rating';
import Message from './Message';
const Review = ({ review }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='subtitle1' component='div'>
        <strong>{review.name}</strong>
      </Typography>
      <Rating value={review.rating} precision={0.5} size='small' />
      <Typography variant='subtitle2' component='div' color='text.secondary'>
        {new Date(review.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant='body1' component='p' sx={{ mt: 1 }}>
        {review.comment}
      </Typography>
      <Divider
        sx={{
          marginTop: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          height: '2px',
        }}
      />
    </Box>
  );
};

export default Review;
