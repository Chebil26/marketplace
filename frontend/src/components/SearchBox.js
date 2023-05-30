import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {
  let navigate = useNavigate();
  const location = useLocation();

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
    <form
      onSubmit={submitHandler}
      style={{ display: 'flex', marginLeft: '50px' }}>
      <TextField
        type='search'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Explore'
        variant='outlined'
        size='small'
        sx={{
          width: '400px',
          borderRadius: '10px',
          marginRight: '8px',
          backgroundColor: 'white',
          // paddingRight: '10px', // Add padding to the right
        }}
      />
      <Button type='submit' variant='contained' color='success'>
        <i className='fas fa-search'></i>
      </Button>
    </form>
  );
}

export default SearchBox;
