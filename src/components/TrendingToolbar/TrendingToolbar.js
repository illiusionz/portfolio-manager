// src/components/TrendingToolbar.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import './TrendingToolbar.scss';
import StockHoverPopup from '../StockHoverPopup/StockHoverPopup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBatchStockSnapshots } from '../../features/stocks/stockThunks';
import { selectAllStockSnapshots } from '../../features/stocks/stockSelectors';

const TrendingToolbar = () => {
  const dispatch = useDispatch();
  const [hoveredStock, setHoveredStock] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({
    top: 0,
    left: 0,
    height: 0,
  });
  const [showPercentChange, setShowPercentChange] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  let hoverTimeout = null;
  const toolbarRef = useRef(null);

  const manualStocks = [
    'AAPL',
    'AMZN',
    'GOOG',
    'SHOP',
    'AFRM',
    'ADBE',
    'TSLA',
    'MSFT',
    'NVDA',
    'AMD',
    'PYPL',
    'NFLX',
    'SNAP',
    'SPOT',
    'PINS',
    'TSM',
    'UBER',
    'LYFT',
    'SQ',
    'ROKU',
    'CRWD',
    'DOCU',
    'META',
    'PLTR',
    'AVGO',
    'OKTA',
    'RIVN',
    'PDD',
    'DDOG',
    'AMC',
    'BA',
    'BABA',
    'BAC',
    'C',
    'DIS',
    'F',
    'GE',
    'GME',
    'GS',
    'HD',
    'IBM',
    'INTC',
    'JNJ',
    'JPM',
    'KO',
    'MCD',
    'SMCI',
    'HOOD',
    'OXY',
    'NKE',
    'PFE',
    'PG',
    'MRVL',
    'UNH',
    'V',
    'VZ',
    'WBA',
    'ARM',
    'XOM',
  ];
  const indexTickers = ['SPY', 'QQQ', 'IWM', 'DIA'];

  // Combine both index and manual stock tickers
  const allTickers = [...indexTickers, ...manualStocks];

  // Select all stock data from Redux store using memoized selector
  const stockData = useSelector(selectAllStockSnapshots);

  // Fetch batched stock data on component mount
  useEffect(() => {
    dispatch(fetchBatchStockSnapshots(allTickers));
  }, [dispatch, allTickers]);

  // Handle mouse enter event for stock items
  const handleMouseEnter = (stock, event) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const stockItemRect = event.currentTarget.getBoundingClientRect();
    setHoveredStock(stock);
    setHoverPosition({
      top: stockItemRect.top + window.scrollY,
      left: stockItemRect.left + window.scrollX,
      height: stockItemRect.height,
    });
    setIsPaused(true); // Pause the animation
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      setHoveredStock(null);
      setIsPaused(false); // Resume the animation
    }, 200);
  };

  const handlePopupMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsPaused(true); // Pause the animation
  };

  const handlePopupMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setHoveredStock(null);
      setIsPaused(false); // Resume the animation
    }, 200);
  };

  // Render each stock item with proper styling and data
  const renderTrendingStock = (symbol, index) => {
    const stock = stockData[symbol];

    if (!stock) return null;
    const changePercent = stock?.todaysChangePerc?.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div
        key={`${symbol}-${index}`}
        className={`stock-item ${changeClass}`}
        onMouseEnter={(e) => handleMouseEnter(stock, e)}
        onMouseLeave={handleMouseLeave}>
        <span className='stock-symbol'>{stock.ticker}</span>
        {showPercentChange ? (
          <>
            <FontAwesomeIcon icon={arrowIcon} />
            <span className='stock-percent'>{changePercent}%</span>
          </>
        ) : (
          <span className='stock-price'>${stock?.day?.c?.toFixed(2)}</span>
        )}
      </div>
    );
  };

  const renderIndexStock = (symbol, index) => {
    const stock = stockData[symbol];
    if (!stock) return null;
    const price = stock?.day?.c?.toFixed(2);
    const changePercent = stock?.todaysChangePerc?.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div key={`${symbol}-${index}`} className={`stock-item ${changeClass}`}>
        <span className='stock-symbol'>{stock.ticker}</span>
        {showPercentChange ? (
          <>
            <FontAwesomeIcon icon={arrowIcon} />
            <span className='stock-percent'>{changePercent}%</span>
          </>
        ) : (
          <span className='stock-price'>${price}</span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`trending-toolbar ${isPaused ? 'paused' : ''}`}
      ref={toolbarRef}>
      <div className='form-check form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          id='toggleSwitch'
          checked={showPercentChange}
          onChange={() => setShowPercentChange(!showPercentChange)}
        />
      </div>
      <div className='index-data'>
        {indexTickers.map((symbol) => renderIndexStock(symbol))}

        <span className='trending-label text-secondary'>
          Trending <FontAwesomeIcon icon={faCircleInfo} />
        </span>
      </div>
      <div className='trending-stocks'>
        <div className='scroll-container'>
          {manualStocks.map((symbol) => renderTrendingStock(symbol))}
        </div>
      </div>
      {hoveredStock && (
        <StockHoverPopup
          stock={hoveredStock}
          position={hoverPosition}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        />
      )}
    </div>
  );
};

export default TrendingToolbar;
