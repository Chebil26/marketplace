import React, { useState } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../features/postSlice';
import Post from '../components/Post';

const PostCreateScreen = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [created, setCreated] = useState(false);
  const storeByUser = useSelector((state) => state.storeByUser);
  const { loading: loadingStore, error: errorStore, store } = storeByUser;

  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const dispatch = useDispatch();

  // const postDetails = useSelector(state => state.postDetails)
  // const { loading:loadingpost, error:errorpost, post } = postDetails

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleButtonClick = () => {
    setShowComponent(true);
  };
  const handleCancelClick = () => {
    setShowComponent(false);
  };
  return (
    <div>
      <Button onClick={handleButtonClick}>Create a Post </Button>
      {showComponent && <Button onClick={handleCancelClick}>Cancel</Button>}

      {showComponent && <CreatePostForm />}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostCreateScreen;
