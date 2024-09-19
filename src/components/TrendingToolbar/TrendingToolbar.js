import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import './TrendingToolbar.scss';
import StockHoverPopup from '../StockHoverPopup/StockHoverPopup';
import { useDispatch } from 'react-redux';

const TrendingToolbar = () => {
  const dispatch = useDispatch();
  const [indexData, setIndexData] = useState({});
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [hoveredStock, setHoveredStock] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({
    top: 0,
    left: 0,
    height: 0,
  });
  const [showPercentChange, setShowPercentChange] = useState(true);
  const [isPaused, setIsPaused] = useState(false); // State to control animation pause

  let hoverTimeout = null;
  const toolbarRef = useRef(null);
  const manualStocks = [
    'AAPL',
    'AMZN',
    'GOOG',
    'SHOP',
    'AFRM',
    'GME',
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

  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    const fetchData = async (ticker, isIndex = false) => {
      try {
        const response = await fetch(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`
        );
        const data = await response.json();
        if (isIndex) {
          setIndexData((prevData) => ({ ...prevData, [ticker]: data.ticker }));
        } else {
          return data.ticker;
        }
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return null;
      }
    };

    const fetchTrendingStocks = async () => {
      const stockDataPromises = manualStocks.map((ticker) => fetchData(ticker));
      const stockData = await Promise.all(stockDataPromises);
      setTrendingStocks(stockData.filter((stock) => stock !== null));
    };

    indexTickers.forEach((ticker) => fetchData(ticker, true));
    fetchTrendingStocks();
  }, [apiKey]);

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

  const renderStock = (stock, index) => {
    if (!stock) return null;
    const changePercent = stock.todaysChangePerc.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div
        key={`${stock.ticker}-${index}`}
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
          <span className='stock-price'>${stock.day.c.toFixed(2)}</span>
        )}
      </div>
    );
  };

  const renderIndexData = (ticker) => {
    const data = indexData[ticker];
    if (!data) return null;
    const changePercent = data.todaysChangePerc.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div key={ticker} className={`index-item ${changeClass}`}>
        <span className='stock-symbol'>{data.ticker}</span>
        {showPercentChange ? (
          <>
            <FontAwesomeIcon icon={arrowIcon} />
            <span className='stock-percent'>{changePercent}%</span>
          </>
        ) : (
          <span className='stock-price'>${data.day.c.toFixed(2)}</span>
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
        {indexTickers.map((ticker) => renderIndexData(ticker))}
        <span className='trending-label text-secondary'>
          Trending <FontAwesomeIcon icon={faCircleInfo} />
        </span>
      </div>
      <div className='trending-stocks'>
        <div className='scroll-container'>
          {[...trendingStocks, ...trendingStocks].map(renderStock)}
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
