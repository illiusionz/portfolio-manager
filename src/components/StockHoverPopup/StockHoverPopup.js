import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { addToWatchlist } from '../../features/watchlist/watchlistSlice'; // Updated path
import './StockHoverPopup.css';

const StockHoverPopup = ({ stock, position }) => {
  const dispatch = useDispatch();

  if (!stock) return null;

  const changePercent = stock.todaysChangePerc.toFixed(2);
  const changeClass = changePercent >= 0 ? 'positive' : 'negative';
  const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist(stock.ticker));
    console.log(`Added ${stock.ticker} to watchlist`);
  };

  console.log('Displaying popup for stock:', stock);

  return (
    <div
      className='stock-hover-popup'
      style={{ top: position.top + 10, left: position.left + 10 }}
      onMouseEnter={() => console.log('Mouse enter popup')}
      onMouseLeave={() => console.log('Mouse leave popup')}>
      <div className='popup-header'>
        <div className='popup-ticker'>
          <span className='stock-symbol'>{stock.ticker}</span>
          <span className='stock-name'>{stock.name}</span>
        </div>
        <button className='watch-button' onClick={handleAddToWatchlist}>
          Watch
        </button>
      </div>
      <div className='popup-price'>
        <span className='stock-price'>${stock.price}</span>
        <span className={`price-change ${changeClass}`}>
          <FontAwesomeIcon icon={arrowIcon} /> {stock.priceChange} (
          {changePercent}%)
        </span>
      </div>
      <div className='popup-chart'>
        {/* Placeholder for chart */}
        <div className='line-chart'></div>
      </div>
      <div className='popup-description'>
        {stock.description || 'No description available.'}
      </div>
    </div>
  );
};

export default StockHoverPopup;
