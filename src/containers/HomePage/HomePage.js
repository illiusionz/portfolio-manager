// src/containers/HomePage/HomePage.js
import React from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import './HomePage.css';

function HomePage({ stockData, error }) {
  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        <h1>Welcome to Portfolio Manager</h1>
        {error && <div className='alert alert-danger'>{error}</div>}
        {stockData ? (
          <div className='stock-data'>
            <h2>{stockData.symbol}</h2>
            <p>Date: {stockData.date}</p>
            <p>Open: ${stockData.open.toFixed(2)}</p>
            <p>Close: ${stockData.close.toFixed(2)}</p>
            <p>High: ${stockData.high.toFixed(2)}</p>
            <p>Low: ${stockData.low.toFixed(2)}</p>
            <p>Volume: {stockData.volume.toLocaleString()}</p>
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
