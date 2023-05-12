import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import debounce from 'lodash/debounce';

function SelectBook(props) {
  const API_URL = 'http://localhost:8000/api/books/';

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null); // added state for selected option
  function handleClick() {
    props.sendDataToParent(inputValue);
    
  }

  const loadOptions = async (inputValue) => {
    const response = await fetch(`${API_URL}?keyword=${inputValue}`);
    const data = await response.json();

    const options = data.map((book) => ({
      value: book,
      label: book.title,
    }));

    setOptions(options);
  };

  console.log(options)

  const debouncedLoadOptions = debounce(loadOptions, 500);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }; //

  function handleClick() {
    props.sendDataToParent(selectedOption);
    
  }

  const handleInputChange = (inputValue) => {
    const sanitizedInputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
    setInputValue(sanitizedInputValue);
    debouncedLoadOptions(sanitizedInputValue);
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
  };

  return (
    <div>
      <h3>Choose a Book</h3>
      <Select
        isClearable
        isSearchable
        inputValue={inputValue}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleSelectChange} // added onChange handler to update selected option
        value={selectedOption} // added value prop to show selected option
        styles={colorStyles}

      />
      <Button className="m-1"variant='success' onClick={handleClick}>Confirm</Button>
    </div>
  );
}

export default SelectBook;