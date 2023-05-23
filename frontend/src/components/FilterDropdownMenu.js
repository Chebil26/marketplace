import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const FilterDropdownMenu = ({ categories, filterHandler, clearHandler }) => {
  return (
    <div style={{ display: 'flex', marginTop: '1rem' }}>
      <Dropdown drop='end' alignRight>
        <Dropdown.Toggle variant='outline-info' id='dropdown-button'>
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item
              key={category}
              onClick={() => filterHandler(category)}>
              <Button className='mx-1' variant='info' block>
                {category}
              </Button>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button className='mx-1' variant='outline-warning' onClick={clearHandler}>
        Clear <i className='fa-solid fa-rotate-left'></i>
      </Button>
    </div>
  );
};

export default FilterDropdownMenu;
