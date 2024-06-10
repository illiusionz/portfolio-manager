// src/redux/actions/stockActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUserSymbol, setStockPrice } from './userActions';

const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';

export const fetchStocks = createAsyncThunk(
  'stocks/fetchStocks',
  async (_, { getState }) => {
    const state = getState();
    const symbol = state.user.symbol || 'TSLA';
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-01-01/2023-12-31?apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    const data = await response.json();
    return data.results;
  }
);

export const fetchStockPrice = createAsyncThunk(
  'stocks/fetchStockPrice',
  async (symbol, { rejectWithValue, dispatch }) => {
    console.log(`Fetching stock price for symbol: ${symbol}`);
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`
      );
      console.log('Stock price data:', response.data);
      dispatch(setStockPrice(response.data.ticker.day.o)); // Assuming you want the opening price
      return response.data;
    } catch (error) {
      console.error('Error fetching stock price:', error);
      if (error.response && error.response.status === 403) {
        return rejectWithValue(
          'Access forbidden: check API key and permissions.'
        );
      } else {
        return rejectWithValue('Error fetching stock price');
      }
    }
  }
);
