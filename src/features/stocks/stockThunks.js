// src/features/stocks/stockThunks.js
import { debounce } from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setStockTickerData, setStockDetails } from './stockSlice';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

// Thunk to fetch stock snapshot data and ensure correct structure
export const fetchStockSnapshot = createAsyncThunk(
  'stocks/fetchStockSnapshot',
  async (symbol, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`
      );

      const { ticker } = response.data;

      // Check if 'ticker' object exists
      if (!ticker) {
        console.error('Invalid response structure:', response.data);
        return rejectWithValue('Ticker data is missing in the response.');
      }

      console.log('Fetched stock snapshot data:', ticker);

      // Return the 'ticker' object and the 'symbol' to the reducer
      return { ticker: symbol, data: ticker };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      if (error.response && error.response.status === 403) {
        return rejectWithValue(
          'Access forbidden: check API key and permissions.'
        );
      } else {
        return rejectWithValue('Error fetching stock snapshot');
      }
    }
  }
);

// Thunk to fetch detailed stock information
export const fetchStockDetails = createAsyncThunk(
  'stocks/fetchStockDetails',
  async (symbol, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${apiKey}`
      );
      return response.data.results; // Return the full results object
    } catch (error) {
      if (error.response && error.response.status === 403) {
        return rejectWithValue(
          'Access forbidden: check API key and permissions.'
        );
      } else {
        return rejectWithValue('Error fetching stock details');
      }
    }
  }
);

// Thunk to fetch historical stock data
export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const symbol = state.user.symbol;
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-01-01/2023-12-31?apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch stock data');
    }
  }
);

// Thunk to fetch dividend data
export const fetchDividends = createAsyncThunk(
  'stocks/fetchDividends',
  async (symbol, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/dividends?ticker=${symbol}&apiKey=${apiKey}`
      );
      return response.data.results;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        return rejectWithValue(
          'Access forbidden: check API key and permissions.'
        );
      } else {
        return rejectWithValue('Error fetching dividend data');
      }
    }
  }
);
