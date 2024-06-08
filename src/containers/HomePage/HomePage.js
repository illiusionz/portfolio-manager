// src/containers/HomePage/HomePage.js
import React, { useState } from 'react';
import Chart from '../../components/Chart/Chart';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import './HomePage.css';

const HomePage = ({ stockData = [], error, isDarkMode, toggleDarkMode }) => {
  const [timeRange, setTimeRange] = useState('1D');

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Fetch data based on the new range and update the state
  };

  return (
    <div className='homepage container mt-4'>
      <div className='hero-section container mt-4'>
        <div id='chart' className='mt-4'>
          {error && <div className='alert alert-danger'>{error}</div>}
          <Chart data={stockData} isDarkMode={isDarkMode} />
        </div>
        <div className='d-flex justify-content-center mt-3'>
          {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'].map(
            (range) => (
              <button
                key={range}
                className={`btn btn-outline-primary ${
                  timeRange === range ? 'active' : ''
                }`}
                onClick={() => handleTimeRangeChange(range)}>
                {range}
              </button>
            )
          )}
          <button className='btn btn-dark ms-2' onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Compound Interest Calculator</h5>
            </div>
            <div className='card-body'>
              <CompoundInterestCalculator />
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>
                Percentage Difference Calculator
              </h5>
            </div>
            <div className='card-body'>
              <PercentageDifferenceCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
