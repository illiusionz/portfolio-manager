// src/containers/HomePage/HomePage.js
import React, { useState, useEffect } from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import CombinedChart from '../../components/CombinedChart';
import './HomePage.css';

function HomePage({ stockData, error }) {
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);

  const rsiSettings = {
    period: 14,
    source: 'close',
  };

  useEffect(() => {
    const lastStock = localStorage.getItem('lastStock');
    if (lastStock) {
      fetchStockData(lastStock, '2023-01-01', '2023-12-31'); // Adjust dates as needed
    }
  }, []);

  const fetchStockData = async (symbol, from, to) => {
    const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    // Handle data and set state
  };

  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        <h1>Welcome to Portfolio Manager</h1>
        {error && <div className='alert alert-danger'>{error}</div>}
        {stockData ? (
          <div className='stock-data'>
            <CombinedChart
              stockData={stockData}
              showRSI={showRSI}
              showMACD={showMACD}
              rsiSettings={rsiSettings}
            />
          </div>
        ) : (
          <p>Search for a stock symbol to see the price data.</p>
        )}
      </div>
      <div className='controls'>
        <button
          className='btn btn-outline-primary'
          onClick={() => setShowRSI(!showRSI)}>
          Toggle RSI
        </button>
        <button
          className='btn btn-outline-primary'
          onClick={() => setShowMACD(!showMACD)}>
          Toggle MACD
        </button>
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
