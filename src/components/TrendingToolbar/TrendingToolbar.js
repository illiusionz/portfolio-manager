import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import StockHoverPopup from '../StockHoverPopup/StockHoverPopup';
import './TrendingToolbar.css';

const TrendingToolbar = () => {
  const [spyData, setSpyData] = useState(null);
  const [qqqData, setQqqData] = useState(null);
  const [iwmData, setIwmData] = useState(null);
  const [diaData, setDiaData] = useState(null);
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [hoveredStock, setHoveredStock] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

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
    'PINS',
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

  useEffect(() => {
    const fetchIndexData = async (ticker, setData) => {
      try {
        const response = await fetch(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq`
        );
        const data = await response.json();
        setData(data.ticker || null);
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
      }
    };

    const fetchTrendingStockData = async (ticker) => {
      try {
        const response = await fetch(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq`
        );
        const data = await response.json();
        return data.ticker || null;
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return null;
      }
    };

    const fetchAllTrendingStocks = async () => {
      const stockDataPromises = manualStocks.map(fetchTrendingStockData);
      const stockData = await Promise.all(stockDataPromises);
      setTrendingStocks(stockData.filter((stock) => stock !== null));
    };

    fetchIndexData('SPY', setSpyData);
    fetchIndexData('QQQ', setQqqData);
    fetchIndexData('IWM', setIwmData);
    fetchIndexData('DIA', setDiaData);
    fetchAllTrendingStocks();
  }, []);

  const renderStock = (stock) => {
    if (!stock) return null;
    const changePercent = stock.todaysChangePerc.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div
        key={stock.ticker}
        className={`stock-item ${changeClass}`}
        onMouseEnter={() => {
          setHoveredStock(stock);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setHoveredStock(null);
          setIsPaused(false);
        }}>
        <span className='stock-symbol'>{stock.ticker} </span>
        <FontAwesomeIcon icon={arrowIcon} />
        <span className='stock-percent'> {changePercent}%</span>
      </div>
    );
  };

  const renderIndexData = (data) => {
    if (!data) return null;
    const changePercent = data.todaysChangePerc.toFixed(2);
    const changeClass = changePercent >= 0 ? 'positive' : 'negative';
    const arrowIcon = changePercent >= 0 ? faArrowUp : faArrowDown;

    return (
      <div className={`index-item ${changeClass}`}>
        <span className='stock-symbol'>{data.ticker} </span>
        <FontAwesomeIcon icon={arrowIcon} />
        <span className='stock-percent'> {changePercent}%</span>
      </div>
    );
  };

  return (
    <div className='trending-toolbar'>
      <div className='index-data'>
        {renderIndexData(spyData)}
        {renderIndexData(qqqData)}
        {renderIndexData(iwmData)}
        {renderIndexData(diaData)}
        <span className='trending-label text-secondary'>
          Trending <FontAwesomeIcon icon={faCircleInfo} />
        </span>
      </div>
      <div className='trending-stocks'>
        <div
          className={`scroll-container ${isPaused ? 'paused' : ''}`}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
          {[...trendingStocks, ...trendingStocks].map(renderStock)}
        </div>
      </div>
      {hoveredStock && <StockHoverPopup stock={hoveredStock} />}
    </div>
  );
};

export default TrendingToolbar;
