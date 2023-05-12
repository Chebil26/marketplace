import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { getPosts } from '../features/postSlice';

import Post from '../components/Post';

function PostsListScreen() {
  const storeByUser = useSelector((state) => state.storeByUser);
  const { loading: loadingStore, error: errorStore, store } = storeByUser;

  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="my-5">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.map((post) => (
          // <Link key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
          <Post post={post} />
          // {/* </Link> */}
        ))}
      </div>
    </Container>
  );
}

export default PostsListScreen;
