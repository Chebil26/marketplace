import React, {useState, useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Form, Button , Row , Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'



function LoginScreen({location}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useNavigate()

    const dispatch = useDispatch()


    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            history('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >

                </Form.Control>
            </Form.Group>


            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign in
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New? 
                <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/login'}
                    
                >
                    Register
                </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
