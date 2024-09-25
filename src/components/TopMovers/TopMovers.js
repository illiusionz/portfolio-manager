// src/components/TopMovers/TopMovers.js
import './TopMovers.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSelectors';

const TopMovers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [activeTab, setActiveTab] = useState('gainers');
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useSelector(selectTheme);

  const resultsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gainersResponse = await axios.get(
          'https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq'
        );
        const losersResponse = await axios.get(
          'https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apiKey=6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq'
        );

        setGainers(gainersResponse.data.tickers);
        setLosers(losersResponse.data.tickers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const paginate = (items, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items, itemsPerPage) => {
    return Math.ceil(items.length / itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderTableRows = (stocks) => {
    const paginatedStocks = paginate(stocks, currentPage, resultsPerPage);
    return paginatedStocks.map((stock) => (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>{stock.day.c}</td>
        <td>{stock.todaysChange.toFixed(2)}</td>
        <td>{stock.todaysChangePerc.toFixed(2)}%</td>
        <td>{(stock.day.v / 1e6).toFixed(2)}M</td>
      </tr>
    ));
  };

  const renderPagination = (items) => {
    const pages = totalPages(items, resultsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className='pagination justify-content-center'>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button
                className='page-link'
                onClick={() => handlePageChange(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const activeItems = activeTab === 'gainers' ? gainers : losers;

  return (
    <div className='card top-movers'>
      <div className='card-header'>
        <ul className='nav nav-tabs card-header-tabs'>
          <li className='nav-item'>
            <button
              className={`nav-link ${activeTab === 'gainers' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('gainers');
                setCurrentPage(1);
              }}>
              Top Gainers
            </button>
          </li>
          <li className='nav-item'>
            <button
              className={`nav-link ${activeTab === 'losers' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('losers');
                setCurrentPage(1);
              }}>
              Top Losers
            </button>
          </li>
        </ul>
      </div>
      <div className='card-body'>
        <div className='table-responsive'>
          <table
            className={`table table-striped ${
              theme === 'theme-dark' ? 'table-dark' : ''
            }`}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last</th>
                <th>Chg</th>
                <th>Chg%</th>
                <th>Vol</th>
              </tr>
            </thead>
            <tbody>{renderTableRows(activeItems)}</tbody>
          </table>
        </div>
        {renderPagination(activeItems)}
      </div>
    </div>
  );
};

export default TopMovers;
