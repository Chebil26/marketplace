import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { listStoreDetails } from '../actions/storeActions';

function Post({ post }) {
  const formatDate = new Date(post.date_created);
  const date = formatDate.toDateString();
  const maxWords = 30; // Maximum number of words to display
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  // const storeDetails = useSelector((state) => state.storeDetails);
  // const { error, loading, store } = storeDetails;

  // useEffect(() => {
  //   dispatch(listStoreDetails(2));
  // }, [dispatch]);

  // console.log(store);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateContent = (content) => {
    const words = content.split(' ');
    if (words.length > maxWords) {
      const truncatedWords = words.slice(0, maxWords).join(' ');
      const remainingWords = words.slice(maxWords).join(' ');
      return (
        <span>
          {truncatedWords}{' '}
          <a onClick={toggleExpand} className='continue-reading'>
            ...Continue reading
          </a>
          {isExpanded && remainingWords}
        </span>
      );
    }
    return content;
  };

  return (
    <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ m: 3 }}>
        {/* <CardMedia component='img' height='140' image={post.image} alt={post.title} /> */}
        <CardContent>
          <Typography variant='h6' component='div' sx={{ fontSize: 18 }}>
            {post.title}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            By {post.store}
          </Typography>
          <Typography variant='body2'>
            {truncateContent(post.content)}
          </Typography>
          {/* <Button variant="contained" color="primary">Read More</Button> */}
        </CardContent>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {date}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Post;
