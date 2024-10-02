import './EarningsCalendar.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Card, Pagination } from 'react-bootstrap'; // Import Bootstrap Card and Pagination components
import { selectTheme } from '../../features/theme/themeSelectors';
import { handleTableSort } from '../../utils/tableSortUtils'; // Import the generalized sorting utility

const ITEMS_PER_PAGE = 7; // Number of items to show per page
const PAGINATION_SIZE = 3; // Maximum number of pagination items to display

// Function to transform the nested earnings data to a flat array
const transformEarningsData = (earnings) => {
  const result = [];

  for (const date in earnings) {
    const stocks = earnings[date].stocks || [];
    stocks.forEach((stock) => {
      // Determine if the earnings time is AM or PM
      const timeString = stock.time;
      let earningsTimeFormatted = timeString;
      if (timeString) {
        const timeParts = timeString.split(':');
        if (timeParts.length === 3) {
          // Check if time format is HH:mm:ss
          const hours = parseInt(timeParts[0], 10);
          const suffix = hours < 12 ? 'AM' : 'PM';
          const formattedHours = hours % 12 || 12; // Convert to 12-hour format
          earningsTimeFormatted = `${formattedHours}:${timeParts[1]} ${suffix}`;
        } else {
          earningsTimeFormatted = 'Invalid Time Format';
        }
      } else {
        earningsTimeFormatted = 'Time Not Available';
      }

      result.push({
        earningsDate: date,
        ticker: stock.symbol,
        companyName: stock.title,
        earningsTime: earningsTimeFormatted,
        importance: stock.importance,
      });
    });
  }

  return result;
};

const EarningsCalendar = () => {
  const [startDate, setStartDate] = useState(new Date('2024-09-01'));
  const [endDate, setEndDate] = useState(new Date('2024-09-24'));
  const [earnings, setEarnings] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null); // Correct initialization
  const [sortDirection, setSortDirection] = useState('asc'); // Correct initialization
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const theme = useSelector(selectTheme);

  const fetchEarnings = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.stocktwits.com/api/2/discover/earnings_calendar`,
        {
          params: {
            date_from: format(startDate, 'yyyy-MM-dd'),
            date_to: format(endDate, 'yyyy-MM-dd'),
          },
        }
      );

      const earningsData = response.data.earnings || {};
      setEarnings(earningsData);
    } catch (error) {
      console.error('Error fetching earnings data:', error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch earnings data when the component first loads
  useEffect(() => {
    fetchEarnings();
  }, []);

  // Transform earnings data whenever earnings state changes
  useEffect(() => {
    setTransformedData(transformEarningsData(earnings));
  }, [earnings]);

  // Calculate the data to display on the current page
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = transformedData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler for First button
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // Handler for Previous button
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler for Next button
  const handleNextPage = () => {
    const totalPages = Math.ceil(transformedData.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler for Last button
  const handleLastPage = () => {
    const totalPages = Math.ceil(transformedData.length / ITEMS_PER_PAGE);
    setCurrentPage(totalPages);
  };

  // Pagination range calculation
  const totalPages = Math.ceil(transformedData.length / ITEMS_PER_PAGE);
  const startPage = Math.max(1, currentPage - Math.floor(PAGINATION_SIZE / 2));
  const endPage = Math.min(totalPages, startPage + PAGINATION_SIZE - 1);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Ensure 'sortedColumn' and 'sortDirection' are initialized and used correctly
  const handleSort = (column) => {
    const { sortedData, sortedColumn, sortDirection } = handleTableSort(
      transformedData,
      column,
      sortedColumn, // Check that this matches the state variable defined above
      sortDirection // Check that this matches the state variable defined above
    );

    setSortedColumn(sortedColumn); // Updates the state with the new sorted column
    setSortDirection(sortDirection); // Updates the state with the new sort direction
    setTransformedData(sortedData); // Updates the state with the sorted data
  };

  return (
    <div className='earnings-calendar'>
      <Card>
        <Card.Header>
          <Card.Title>Earnings Calendar</Card.Title>
        </Card.Header>
        <Card.Body>
          {/* Responsive row with Start Date, End Date and Button */}
          <div className='row gx-2 gy-2 align-items-center'>
            <div className='col-12 col-sm-6 col-md-4'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Start Date'
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField
                      className='form-control'
                      {...params}
                      fullWidth
                      sx={{ height: '38px' }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className='col-12 col-sm-6 col-md-4'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='End Date'
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => (
                    <TextField
                      className='form-control'
                      {...params}
                      fullWidth
                      sx={{ height: '38px' }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className='col-12 col-md-4 text-md-start text-center'>
              <Button
                variant='contained'
                color='primary'
                onClick={fetchEarnings}
                fullWidth>
                Submit
              </Button>
            </div>
          </div>
          {loading ? (
            <div className='d-flex justify-content-center'>
              <CircularProgress />
            </div>
          ) : (
            <div className='table-responsive'>
              <table
                className={`table table-striped mt-3 table-hover ${
                  theme === 'theme-dark' ? 'table-dark' : ''
                }`}>
                <thead className='thead-dark'>
                  <tr>
                    <th onClick={() => handleSort('earningsDate')}>
                      Earnings Date
                      {sortedColumn === 'earningsDate' &&
                        (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th onClick={() => handleSort('ticker')}>
                      Ticker
                      {sortedColumn === 'ticker' &&
                        (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th onClick={() => handleSort('companyName')}>
                      Company Name
                      {sortedColumn === 'companyName' &&
                        (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th onClick={() => handleSort('earningsTime')}>
                      Earnings Time
                      {sortedColumn === 'earningsTime' &&
                        (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th onClick={() => handleSort('importance')}>
                      Importance
                      {sortedColumn === 'importance' &&
                        (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.earningsDate}</td>
                        <td>{item.ticker}</td>
                        <td>{item.companyName}</td>
                        <td>{item.earningsTime}</td>
                        <td>{item.importance}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='5'>No data available for selected dates</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Responsive Pagination controls */}
              <div className='d-flex justify-content-center'>
                <Pagination>
                  <Pagination.First onClick={handleFirstPage} />
                  <Pagination.Prev onClick={handlePrevPage} />
                  {startPage > 1 && <Pagination.Ellipsis />}
                  {pageNumbers.map((pageNumber) => (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}>
                      {pageNumber}
                    </Pagination.Item>
                  ))}
                  {endPage < totalPages && <Pagination.Ellipsis />}
                  <Pagination.Next onClick={handleNextPage} />
                  <Pagination.Last onClick={handleLastPage} />
                </Pagination>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EarningsCalendar;
