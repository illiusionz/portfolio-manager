// src/layout/Navbar.js
import React, { useState } from 'react';
import './Layout.css';

function Navbar({ toggleSidebar, fetchStockData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchStockData(searchQuery.trim().toUpperCase());
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
      <div className='container-fluid'>
        <button
          className='btn btn-primary'
          id='sidebarToggle'
          onClick={toggleSidebar}>
          Toggle Menu
        </button>
        <form className='d-flex ms-3' onSubmit={handleSearchSubmit}>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='btn btn-outline-primary' type='submit'>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
