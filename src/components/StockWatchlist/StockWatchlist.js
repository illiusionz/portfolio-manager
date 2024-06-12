import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../../redux/actions/watchlistActions';
import axios from 'axios';
import './StockWatchlist.css';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

const StockWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.symbols);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchStockData = async (symbol) => {
      try {
        const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`;
        const response = await axios.get(url);
        setStockData((prevData) => ({
          ...prevData,
          [symbol]: response.data.ticker,
        }));
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to fetch stock data.');
      }
    };

    if (watchlist.length > 0) {
      setLoading(true);
      const fetchData = async () => {
        await Promise.all(watchlist.map((symbol) => fetchStockData(symbol)));
        setLoading(false);
      };
      fetchData();
    }
  }, [watchlist]);

  const handleRemove = (symbol) => {
    dispatch(removeFromWatchlist(symbol));
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Stock Watchlist</h5>
      </div>
      <div className='card-body'>
        {error && <div className='error'>{error}</div>}
        {loading ? (
          <p>Loading data...</p>
        ) : watchlist.length === 0 ? (
          <p>No stocks in watchlist</p>
        ) : (
          <table
            className={`table table-striped mt-3 ${
              theme === 'dark' ? 'table-dark' : ''
            }`}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last</th>
                <th>Chg</th>
                <th>Chg%</th>
                <th>Vol</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((symbol) => {
                const data = stockData[symbol] || {};
                const { day, prevDay } = data;

                const lastPrice = day ? day.c : '';
                const change =
                  lastPrice && prevDay
                    ? (lastPrice - prevDay.c).toFixed(2)
                    : '';
                const changePercent =
                  change && prevDay
                    ? ((change / prevDay.c) * 100).toFixed(2)
                    : '';
                const volume = day ? day.v : '';

                return (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>{lastPrice}</td>
                    <td>{change}</td>
                    <td>{changePercent}%</td>
                    <td>{volume}</td>
                    <td>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleRemove(symbol)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StockWatchlist;
