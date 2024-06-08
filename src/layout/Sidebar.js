// src/layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <nav className={`sidebar ${isOpen ? 'toggled' : ''}`}>
      <div className='sidebar-heading'>Portfolio Manager</div>
      <ul className='list-group'>
        <li className='list-group-item'>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='list-group-item'>
          <NavLink to='/asset-management' activeClassName='active'>
            Asset Management
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;
