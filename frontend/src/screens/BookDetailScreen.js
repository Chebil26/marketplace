import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookDetailScreen(props) {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/books/${id}/`);
      setBook(response.data);
    }
    fetchData();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  console.log(book.cover);

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.cover} alt='My Image' />
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
}

export default BookDetailScreen;
