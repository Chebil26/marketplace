import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Store({ store }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/stores/${store.id}`}>
        <CardMedia
          component='img'
          height='140'
          image={`${process.env.REACT_APP_API_SERVER}${store.image}`}
          alt={store.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {store.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {store.wilaya}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Store;
