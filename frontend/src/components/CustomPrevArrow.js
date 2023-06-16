import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomPrevArrow = ({ onClick }) => (
  <IconButton className='custom-prev-arrow' onClick={onClick}>
    <ArrowBackIcon />
  </IconButton>
);

export default CustomPrevArrow;
