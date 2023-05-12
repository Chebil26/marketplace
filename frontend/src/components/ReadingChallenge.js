import React, {useEffect, useState, useMemo} from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateReadingChallenge, readingChallengeByUser, incrementReadingChallenge } from '../actions/challengeActions'

import FormContainer from './FormContainer'


function ReadingChallenge({readingChallenge}) {
    // if (typeof readingChallenge.books_read === 'string') {
    // const books_read = readingChallenge.books_read.split(';')
    // }else{
    //     const books_read = readingChallenge.books_read
    // }
    const dispatch = useDispatch()

    const [number, setNumber] = useState(0)
    const [goal, setGoal] = useState(0)
    const [book, setBook] = useState('')
    const [books_read, setBooks_read] = useState('')

    const handleincrementClick = (e) => {
      e.preventDefault()
      dispatch(incrementReadingChallenge())
      dispatch(readingChallengeByUser())
      setNumber(readingChallenge.current_read_books)
      setGoal(readingChallenge.goal)
      setBooks_read(readingChallenge.books_read)
    }

    const addBookHandler = (e) => {
      e.preventDefault()
      dispatch(updateReadingChallenge({
        
        book,
      }))
      dispatch(readingChallengeByUser())
    }

  return (
    <Card className="my-1 p-1 rounded" style={{ width: '25rem' }} >

      <Card.Body>
        <Card.Title as="h2">
          Reading Challenge
        </Card.Title>

      <Card.Text as="h3">
            goal: {readingChallenge.goal} books a year 
        </Card.Text>

        <Card.Text as="h3">
            current: {readingChallenge.current_read_books} books  <Button onClick={handleincrementClick}>+1</Button>
        </Card.Text>

        <Card.Text as="h4">
            {readingChallenge.books_read}
        </Card.Text>

       
          <Form onSubmit={addBookHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>add a book</Form.Label>
          <Form.Control type="text"
                        placeholder="ex: harry potter..." 
                        value={book}
                        onChange={(e) => setBook(e.target.value)}
                        
                        />
          <Form.Text className="text">
            
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
 

      </Card.Body>
    </Card>
  )
}

export default ReadingChallenge
