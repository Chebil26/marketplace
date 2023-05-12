import React, {useState, useEffect} from 'react'
import { Row, Col,Badge } from 'react-bootstrap'
import axios from 'axios'
import AsyncSelect from 'react-select/async';
import Select from 'react-select';


function BooksScreen() {
    const [books, setBooks] = useState([]);
    const hi = false
  
    useEffect(() => {
      fetch('http://localhost:8000/api/books/')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.log(error));
    }, []);
    const loadOptions = async (inputValue, callback) => {
      try {
        // Fetch options from API or any other data source
        const response = await fetch(`https://api.example.com/options?q=${inputValue}`);
        const options = await response.json();
    
        // Call the callback with fetched options
        callback(options);
      } catch (error) {
        console.error('Error fetching options:', error);
        // Handle error as needed
      }



      const aa = (selectedOption) => {
        console.log("handleChange", selectedOption)
      }

      const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
          const filteredOptions = options.filter((option) => 
          option.label.toLowerCase().includes(searchValue.toLowerCase())
          )
          console.log("loadOptions", searchValue, filteredOptions)
          callback(filteredOptions)
        }, 2000)
      }
    }
    const options = [
      {value: "hamid" , label: "hamid"},
      {value: "jack" , label: "jack"},
      {value: "aziz" , label: "aziz"},
      {value: "qdider" , label: "qdider"},
    ]

    return (
      <div>

        <h1>Books</h1>
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Description: {book.description}</p>
            </li>
          ))}
        </ul>


      </div>
    );
  }
  
  export default BooksScreen
  