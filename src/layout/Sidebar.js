import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar, toggleDarkMode, isDarkMode }) {
  return (
    <div
      className={`bg-dark text-white sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className='sidebar-sticky'>
        <div className='sidebar-heading text-center'>Portfolio Manager</div>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <Link to='/' className='nav-link text-white'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/compound-interest-calculator'
              className='nav-link text-white'>
              Compound Interest Calculator
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/percentage-difference' className='nav-link text-white'>
              Percentage Difference Calculator
            </Link>
          </li>
        </ul>
        <button className='btn btn-outline-light mt-3' onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className='btn btn-outline-light mt-3' onClick={toggleSidebar}>
          {isSidebarOpen ? 'Collapse View' : 'Expand View'}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
