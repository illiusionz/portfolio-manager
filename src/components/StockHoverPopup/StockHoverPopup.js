import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './StockHoverPopup.css';

const StockHoverPopup = ({ stock }) => {
  if (!stock) return null;

  const changePercent = stock.todaysChangePerc.toFixed(2);
  const changeClass = changePercent >= 0 ? 'positive' : 'negative';
  const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

  return (
    <div className='stock-hover-popup'>
      <div className='popup-header'>
        <div className='popup-symbol'>
          {stock.ticker} - {stock.name}
        </div>
        <button className='watch-button'>Watch</button>
      </div>
      <div className='popup-price'>
        <span className={changeClass}>
          {stock.price} <FontAwesomeIcon icon={arrowIcon} />
        </span>
        <span className={changeClass}> {changePercent}%</span>
      </div>
      <div className='popup-chart'>
        {/* Replace this with a small line chart */}
        <img
          src={`https://dummyimage.com/100x40/ddd/000&text=${stock.ticker}`}
          alt='chart'
        />
      </div>
      <div className='popup-info'>
        {stock.description || 'No description available.'}
      </div>
    </div>
  );
};

export default StockHoverPopup;
