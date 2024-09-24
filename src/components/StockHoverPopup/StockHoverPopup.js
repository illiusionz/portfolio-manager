import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { addToWatchlist } from '../../features/watchlist/watchlistSlice';
import './StockHoverPopup.scss';

const StockHoverPopup = React.memo(
  ({ stock, position, onMouseEnter, onMouseLeave }) => {
    const dispatch = useDispatch();
    const popupRef = useRef(null);

    useEffect(() => {
      const popupElement = popupRef.current;
      if (popupElement && position) {
        // Set the position of the popup dynamically below the hovered stock item
        popupElement.style.top = `${position.top + position.height + 10}px`; // Place it below the stock item with some margin
        popupElement.style.left = `${position.left}px`; // Align with the left edge of the stock item
      }
    }, [position]);

    useEffect(() => {
      console.log(`Hovered on stock: ${stock.ticker}`, stock);
    }, [stock]);

    if (!stock) return null;

    const changePercent = stock.todaysChangePerc.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    // Log only if the 'stock' prop changes

    const handleAddToWatchlist = () => {
      dispatch(addToWatchlist(stock.ticker));
      console.log(`Added ${stock.ticker} to watchlist`);
    };

    const truncateText = (text, maxLength) => {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    };

    const truncateName = (name) => {
      if (!name) return '';
      const cutOffIndex = Math.min(
        name.indexOf('.') > -1 ? name.indexOf('.') : name.length,
        name.indexOf(',') > -1 ? name.indexOf(',') : name.length
      );
      return name.substring(0, cutOffIndex);
    };

    return (
      <div
        ref={popupRef}
        className='stock-hover-popup'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <div className='popup-header'>
          <div className='popup-ticker'>
            <span className='stock-symbol'>{stock.ticker}</span>
            <span className='stock-name'>{truncateName(stock.name)}</span>
          </div>
          <button className='watch-button' onClick={handleAddToWatchlist}>
            Watch
          </button>
        </div>
        <div className='popup-price'>
          <span className='stock-price'>${stock.prevDay.c}</span>
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
          {truncateText(stock.description, 200) || 'No description available.'}
        </div>
      </div>
    );
  }
);

export default StockHoverPopup;
