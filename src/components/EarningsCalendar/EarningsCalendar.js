import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Correctly import DatePicker
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Function to transform the nested earnings data to a flat array
const transformEarningsData = (earnings) => {
  const result = [];

  for (const date in earnings) {
    const stocks = earnings[date].stocks || [];
    stocks.forEach((stock) => {
      result.push({
        date: date,
        ticker: stock.symbol,
        companyName: stock.title,
        earningsDate: stock.date,
        earningsTime: stock.time,
        importance: stock.importance,
      });
    });
  }

  return result;
};

const EarningsCalendar = () => {
  const [startDate, setStartDate] = useState(new Date('2024-09-01')); // Default to the start of the month
  const [endDate, setEndDate] = useState(new Date('2024-09-24')); // Default to today
  const [earnings, setEarnings] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Earnings Calendar</h2>
      <div className='row mb-3'>
        <div className='col-md-4'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Start Date'
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className='col-md-4'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='End Date'
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className='col-md-4 d-flex align-items-end'>
          <Button variant='contained' color='primary' onClick={fetchEarnings}>
            Fetch Earnings
          </Button>
        </div>
      </div>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <CircularProgress />
        </div>
      ) : (
        <table className='table table-striped table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th>Date</th>
              <th>Ticker</th>
              <th>Company Name</th>
              <th>Earnings Date</th>
              <th>Earnings Time</th>
              <th>Importance</th>
            </tr>
          </thead>
          <tbody>
            {transformedData.length > 0 ? (
              transformedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.ticker}</td>
                  <td>{item.companyName}</td>
                  <td>{item.earningsDate}</td>
                  <td>{item.earningsTime}</td>
                  <td>{item.importance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6'>No data available for selected dates</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EarningsCalendar;
