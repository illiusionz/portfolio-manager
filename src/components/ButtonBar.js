// src/components/ButtonBar.js
import React from 'react';
import './ButtonBar.css';

function ButtonBar({
  onRangeChange,
  currentRange,
  toggleDarkMode,
  isDarkMode,
}) {
  return (
    <div className='button-bar'>
      <div className='button-group'>
        <button
          className={`btn ${
            currentRange === 'day' ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          onClick={() => onRangeChange('day')}>
          Day
        </button>
        <button
          className={`btn ${
            currentRange === 'week' ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          onClick={() => onRangeChange('week')}>
          Week
        </button>
        <button
          className={`btn ${
            currentRange === 'month' ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          onClick={() => onRangeChange('month')}>
          Month
        </button>
        <button
          className={`btn ${
            currentRange === 'year' ? 'btn-primary' : 'btn-outline-secondary'
          }`}
          onClick={() => onRangeChange('year')}>
          Year
        </button>
        <button className='btn btn-outline-secondary' onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default ButtonBar;
