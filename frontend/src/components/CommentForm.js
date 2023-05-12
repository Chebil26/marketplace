import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { createComment } from '../actions/blogActions';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const commentCreate= useSelector(state => state.commentCreate)
  const { loading:loadingCreate, error:errorCreate , success:successCreate, comment:createdComment } = commentCreate

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment(postId, content,successCreate));
  };

  return (
    <Form onSubmit={submitHandler}>
      {loadingCreate && <p>Loading...</p>}
      {errorCreate && <p>{errorCreate}</p>}
      {successCreate && <p>Comment created!</p>}
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your comment..."
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CommentForm;
