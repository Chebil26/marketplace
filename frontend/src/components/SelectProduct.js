import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import debounce from 'lodash/debounce';

function SelectProduct() {
  const API_URL = 'http://localhost:8000/api/products/';

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const loadOptions = async (inputValue) => {
    const response = await fetch(`${API_URL}?keyword=${inputValue}`);
    const data = await response.json();

    const options = data.map((product) => ({
      value: product.id,
      label: product.name,
    }));

    setOptions(options);
  };

  const debouncedLoadOptions = debounce(loadOptions, 500);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    setInputValue(inputValue);
    debouncedLoadOptions(inputValue);
  };

  return (
    <div>
      <Select
        isSearchable
        inputValue={inputValue}
        options={options}
        onInputChange={handleInputChange}
      />
      aaaaaaaaaaaaaaaa
    </div>
  );
}

export default SelectProduct;