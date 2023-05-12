import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate,useLocation  } from 'react-router-dom'

function SearchBox() {
    let history = useNavigate()
    const location = useLocation();

    const [keyword, setKeyword] = useState('')    
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}&page=1`)
            
        }else{
            history(location.pathname)
        }
    }
    return (
        <Form onSubmit={submitHandler}  className='d-flex '>
            <Form.Group className="mb-1">
            <Form.Control
                type="search"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search..'
                
                aria-label="Search"
            ></Form.Control>
            </Form.Group>

            <Button
                className='mx-1'
                type='submit'
                variant='success'
                
            >
                  <i className="fas fa-search"></i>
            </Button>
        </Form>
    )
}



export default SearchBox
