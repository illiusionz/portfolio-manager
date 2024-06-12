import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import './TrendingToolbar.css';
import StockHoverPopup from '../StockHoverPopup/StockHoverPopup';

const TrendingToolbar = () => {
  const [indexData, setIndexData] = useState({});
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [hoveredStock, setHoveredStock] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

  const manualStocks = [
    'AAPL',
    'AMZN',
    'GOOG',
    'SHOP',
    'AFRM',
    'GME',
    'BOIL',
    'TSLA',
    'MSFT',
    'NVDA',
    'AMD',
    'PYPL',
    'NFLX',
    'FB',
    'TWTR',
    'SNAP',
    'SPOT',
    'PINS',
    'ZM',
    'UBER',
    'LYFT',
    'SQ',
    'ROKU',
    'CRWD',
    'DOCU',
    'NET',
    'FSLY',
    'ZS',
    'OKTA',
    'MDB',
    'ESTC',
    'DDOG',
    'AMC',
    'BA',
    'BABA',
    'BAC',
    'C',
    'DIS',
    'F',
    'GE',
    'GM',
    'GS',
    'HD',
    'IBM',
    'INTC',
    'JNJ',
    'JPM',
    'KO',
    'MCD',
    'MMM',
    'MRK',
    'MS',
    'NKE',
    'PFE',
    'PG',
    'TRV',
    'UNH',
    'V',
    'VZ',
    'WBA',
    'WMT',
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

  const renderStock = (stock, index) => {
    if (!stock) return null;
    const changePercent = stock.todaysChangePerc.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div
        key={`${stock.ticker}-${index}`}
        className={`stock-item ${changeClass}`}
        onMouseEnter={(e) => {
          setHoveredStock(stock);
          setHoverPosition({ top: e.clientY, left: e.clientX });
        }}
        onMouseLeave={() => setHoveredStock(null)}>
        <span className='stock-symbol'>{stock.ticker}</span>
        <FontAwesomeIcon icon={arrowIcon} />
        <span className='stock-percent'>{changePercent}%</span>
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
        <FontAwesomeIcon icon={arrowIcon} />
        <span className='stock-percent'>{changePercent}%</span>
      </div>
    );
  };

  return (
    <div className='trending-toolbar'>
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
        <StockHoverPopup stock={hoveredStock} position={hoverPosition} />
      )}
    </div>
  );
};

export default TrendingToolbar;
