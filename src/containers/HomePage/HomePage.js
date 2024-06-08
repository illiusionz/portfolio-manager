// src/containers/HomePage/HomePage.js
import React, { useState } from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import TradingViewWidget from '../../components/TradingViewWidget';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import './HomePage.css';

function HomePage({ stockData, error, symbol }) {
  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='stock-data'>
          <TradingViewWidget symbol={symbol} />
        </div>
      </div>

      <NewsFeed symbol={symbol} />
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
