import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/asset-management-calculator'>
            Asset Management Calculator
          </Link>
        </li>
        <li>
          <Link to='/compound-interest-calculator'>
            Compound Interest Calculator
          </Link>
        </li>
        <li>
          <Link to='/percentage-difference-calculator'>
            Percentage Difference Calculator
          </Link>
        </li>
        <li>
          <Link to='/option-premium-calculator'>Option Premium Calculator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
