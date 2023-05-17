import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

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
    <Card className='m-3'>
      {/* <Card.Img variant="top" src={post.image} /> */}
      <Card.Body>
        <Link to={`/posts/${post.id}`}>
          <Card.Title style={{ fontSize: '18px' }}>{post.title}</Card.Title>
        </Link>
        <Card.Subtitle>By {post.store}</Card.Subtitle>

        <Card.Text>{truncateContent(post.content)}</Card.Text>
        {/* <Button variant="primary">Read More</Button> */}
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>{date}</small>
      </Card.Footer>
    </Card>
  );
}

export default Post;
