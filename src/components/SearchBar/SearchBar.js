import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue.toUpperCase());
  };

  return (
    <form
      className='d-flex ms-auto search-container'
      onSubmit={handleFormSubmit}>
      <input
        className='form-control'
        type='search'
        placeholder='Search for stocks...'
        aria-label='Search'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className='btn btn-outline-success' type='submit'>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
