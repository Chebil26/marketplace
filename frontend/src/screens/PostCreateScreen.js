import React, { useState } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../features/postSlice';
import Post from '../components/Post';

const PostCreateScreen = () => {
  const [showComponent, setShowComponent] = useState(false);

  const dispatch = useDispatch();

  const storeDetails = useSelector((state) => state.storeDetails);
  const { loading: loadingStore, error: errorStore, store } = storeDetails;

  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  const storePosts = posts.filter((post) => post.store === store.name);

  console.log(storePosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Button
          onClick={handleButtonClick}
          variant='success'
          size='lg'
          style={{ width: '200px' }}>
          Create a Post
        </Button>
        {showComponent && (
          <Button
            onClick={handleCancelClick}
            variant='warning'
            size='lg'
            style={{ width: '200px', marginLeft: '1rem' }}>
            Cancel
          </Button>
        )}
      </div>

      {showComponent && <CreatePostForm />}
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          {storePosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCreateScreen;
