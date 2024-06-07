// src/layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

function Sidebar() {
  return (
    <div className='border-end bg-dark' id='sidebar-wrapper'>
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
    </div>
  );
}

export default Sidebar;
