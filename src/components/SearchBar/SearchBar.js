import React from 'react';
import './SearchBar.css';

const SearchBar = ({
  query,
  suggestions,
  onSearchChange,
  onSuggestionClick,
}) => {
  return (
    <div className='search-bar mb-3'>
      <input
        type='text'
        value={query}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Search for stocks...'
        className='form-control'
      />
      {suggestions.length > 0 && (
        <ul className='list-group mt-2'>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.ticker}
              className='list-group-item'
              onClick={() => onSuggestionClick(suggestion)}>
              {suggestion.name} ({suggestion.ticker})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
