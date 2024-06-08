// src/containers/HomePage/HomePage.js
import React, { useState, useRef } from 'react';
import CompoundInterestCalculator from '../../components/CompoundInterestCalculator/CompoundInterestCalculator';
import PercentageDifferenceCalculator from '../../components/PercentageDifferenceCalculator/PercentageDifferenceCalculator';
import StockChart from '../../components/StockChart';
import RSIChart from '../../components/RSIChart';
import MACDChart from '../../components/MACDChart';
import './HomePage.css';

function HomePage({ stockData, error }) {
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);

  const stockChartRef = useRef();
  const rsiChartRef = useRef();
  const macdChartRef = useRef();

  const syncRefs = [stockChartRef, rsiChartRef, macdChartRef];

  return (
    <div className='container-fluid'>
      <div className='hero-section'>
        <h1>Welcome to Portfolio Manager</h1>
        {error && <div className='alert alert-danger'>{error}</div>}
        {stockData ? (
          <div className='stock-data'>
            <div ref={stockChartRef}>
              <StockChart stockData={stockData} syncRefs={syncRefs} />
            </div>
            {showRSI && (
              <div ref={rsiChartRef}>
                <RSIChart stockData={stockData} syncRefs={syncRefs} />
              </div>
            )}
            {showMACD && (
              <div ref={macdChartRef}>
                <MACDChart stockData={stockData} syncRefs={syncRefs} />
              </div>
            )}
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
