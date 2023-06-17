import React, { useState } from 'react';
import { TextField, Button, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {
  let navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex' }}>
      <TextField
        type='search'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={isSmallScreen ? 'Explore' : 'Search'}
        variant='outlined'
        size='small'
        sx={{
          width: isSmallScreen ? '100%' : '320px',
          borderRadius: '10px',
          marginRight: '4px',
          backgroundColor: 'white',
        }}
      />
      <Button type='submit' variant='contained' color='success'>
        <i className='fas fa-search'></i>
      </Button>
    </form>
  );
}

export default SearchBox;
