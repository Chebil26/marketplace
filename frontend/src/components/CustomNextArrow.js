import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomNextArrow = ({ onClick }) => (
  <IconButton className='custom-next-arrow' color='success' onClick={onClick}>
    <ArrowForwardIcon />
  </IconButton>
);

export default CustomNextArrow;
