import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { listpostDetails, listComments } from '../actions/blogActions';
import CommentForm from '../components/CommentForm';
import CommentsList from '../components/CommentsList';
import Message from '../components/Message';
import Loader from '../components/Loader';
function PostDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const { error, loading, post } = postDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successCreate } = commentCreate;

  useEffect(() => {
    dispatch(listpostDetails(id));
    dispatch(listComments(id));
  }, [dispatch, id, successCreate]);

  return (
    <Container className='my-5'>
      <Row>
        <Col md={8}>
          <h1>{post.title}</h1>
          <Image
            fluid
            src='https://picsum.photos/800/500'
            alt='Article header image'
            className='my-4'
          />
          <p className='lead'>{post.content}</p>
          <p>
            By {post.store} on{' '}
            {new Date(post.date_created).toLocaleDateString()}
          </p>
        </Col>
        <Col md={4}>
          <h4>Related Articles</h4>
          <ul className='list-unstyled'>
            <li>
              <a href='#'>The Joy of Reading</a>
            </li>
            <li>
              <a href='#'>Why Everyone Should Read More</a>
            </li>
            <li>
              <a href='#'>The Benefits of a Good Book</a>
            </li>
          </ul>
        </Col>
      </Row>
      {/* {post.comms.length === 0 && <Message variant='info'>No Comments</Message>} */}
      {/* {userInfo && <CommentForm postId={post.id} />} */}

      {userInfo ? (
        <CommentForm postId={post.id} />
      ) : (
        <Message variant='info'>
          Please <Link to='/login'>login</Link> to write a comment
        </Message>
      )}
      <hr />

      <CommentsList postId={post.id} />
    </Container>
  );
}

export default PostDetailScreen;
