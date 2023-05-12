import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ListGroup } from 'react-bootstrap';
import { listComments } from '../actions/blogActions';

function CommentsList({ postId }) {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.commentList);
  const { loading, error, comments } = commentList || {};

  useEffect(() => {
    dispatch(listComments(postId));
  }, [dispatch, postId]);
  
  return (
    <Container>
      <h3>Comments:</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <p>{comment.content}</p>
              <p>By {comment.user.username} on {new Date(comment.created_at).toDateString()}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default CommentsList;
