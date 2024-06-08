// src/layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <div
      className={`border-end bg-dark ${isSidebarOpen ? '' : 'collapsed'}`}
      id='sidebar-wrapper'>
      <div className='sidebar-heading text-white'>Portfolio Manager</div>
      <div className='list-group list-group-flush'>
        <Link
          className='list-group-item list-group-item-action bg-dark text-white'
          to='/'>
          Home
        </Link>
        <Link
          className='list-group-item list-group-item-action bg-dark text-white'
          to='/compound-interest-calculator'>
          Compound Interest Calculator
        </Link>
        <Link
          className='list-group-item list-group-item-action bg-dark text-white'
          to='/percentage-difference'>
          Percentage Difference Calculator
        </Link>
      </div>
      <button
        className='btn btn-secondary'
        id='sidebarToggle'
        onClick={toggleSidebar}>
        {isSidebarOpen ? 'Collapsed View' : 'Expanded View'}
      </button>
    </div>
  );
}

export default Sidebar;
