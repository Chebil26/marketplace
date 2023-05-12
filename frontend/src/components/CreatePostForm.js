import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
// import { createPost } from '../features/postSlice';
// import { createPost } from '../features/postSlice';
import { createPost } from '../actions/blogActions';

import FormContainer from './FormContainer';

const CreatePostForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postCreate= useSelector(state => state.postCreate)
  const { loading:loadingCreate, error:errorCreate , success:successCreate, post:createdpost } = postCreate


    const storeByUser = useSelector(state => state.storeByUser)
    const { loading:loadingStore, error:errorStore, store } = storeByUser
    const storeName = store.name
    console.log(storeName)


  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch createPost action with the form data
    dispatch(createPost({ 
      title,
      content,
    }));
    // Reset form fields
    // setTitle('');
    // setContent('');
  };

  return (
    <div>
      <FormContainer>
      <h1>Create Post</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Create Post</Button>
    </Form>
      </FormContainer>

      
    </div>
  );
};

export default CreatePostForm;
