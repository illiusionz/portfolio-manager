import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (symbol, { rejectWithValue }) => {
    console.log(`Fetching news for symbol: ${symbol}`);
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/reference/news?ticker=${symbol}&apiKey=${apiKey}`
      );
      console.log('News data:', response.data);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching news:', error);
      if (error.response && error.response.status === 403) {
        return rejectWithValue(
          'Access forbidden: check API key and permissions.'
        );
      } else {
        return rejectWithValue('Error fetching news');
      }
    }
  }
);
