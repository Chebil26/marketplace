import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBlogPosts } from '../actions/blogActions';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { getPosts } from '../features/postSlice';
import Post from '../components/Post';

const StoreBlogScreen = () => {
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

    return (
        <Container>
            <Row className='my-3'>
                <Col>
                    <h2>Blog</h2>
                    <p>
                        Stay up to date with the latest news and updates from
                        our store.
                    </p>
                </Col>
            </Row>
            {loading ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <Row>
                    {storePosts.map((post) => (
                        <Post post={post} />
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default StoreBlogScreen;
