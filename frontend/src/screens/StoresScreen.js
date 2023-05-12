import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { listStores } from '../actions/storeActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Store from '../components/Store';

import axios from 'axios';

function StoresScreen() {
    const storeList = useSelector((state) => state.storeList);
    const { error, loading, stores } = storeList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listStores());
    }, [dispatch]);

    return (
        <div>
            <h1>Stores</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {stores.map((store) => (
                        <Col key={store.id} sm={12} md={6} lg={4} xl={3}>
                            <Store store={store} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default StoresScreen;
