// src/containers/HomePage/HomePage.js
import React from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import StockChart from '../../components/StockChart';
import './HomePage.css';

function HomePage({ stockData, error }) {
  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        <h1>Welcome to Portfolio Manager</h1>
        {error && <div className='alert alert-danger'>{error}</div>}
        {stockData ? (
          <div className='stock-data'>
            <StockChart stockData={stockData} />
          </div>
        ) : (
          <p>Search for a stock symbol to see the price data.</p>
        )}
      </div>
      <div className='row'>
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
}

export default HomePage;
