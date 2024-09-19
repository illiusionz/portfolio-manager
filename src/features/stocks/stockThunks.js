// src/features/stocks/stockThunks.js
import { debounce } from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setStockPrice } from './stockSlice'; // Import the action

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async (_, { getState }) => {
    const state = getState();
    const symbol = state.user.symbol;
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-01-01/2023-12-31?apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    const data = await response.json();
    console.log(`fetchStocks ${data}`);
    return data.results;
  }
);

export const fetchStockSnapshot = createAsyncThunk(
  'stocks/fetchStockSnapshot',
  debounce(async (symbol, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`
      );
      dispatch(setStockPrice(response.data.ticker.prevDay.o));
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        return rejectWithValue(
          'Access forbidden: check API key and permissions.'
        );
      } else {
        return rejectWithValue('Error fetching stock price');
      }
    }
  }, 300) // Throttle API requests to avoid overloading the server
);

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

// Fetch full stock data from Polygon API
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
