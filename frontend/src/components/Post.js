import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Post({ post }) {
    const formatDate = new Date(post.date_created);
    const date = formatDate.toDateString()
    
  return (
    <Card className="m-3 ">
      {/* <Card.Img variant="top" src={post.image} /> */}
      <Card.Body>
      <Link to={`/posts/${post.id}`}>
        <Card.Title>{post.title}</Card.Title>
      </Link>
        <Card.Subtitle>By {post.store}</Card.Subtitle>
        
        <Card.Text>{post.content}</Card.Text>
        {/* <Button variant="primary">Read More</Button> */}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{date}</small>
      </Card.Footer>
    </Card>
  )
  
}

export default Post
