// src/features/news/newsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ userSymbol }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/reference/news?ticker=${userSymbol}&apiKey=${apiKey}`
      );
      // Return the expected structure for the reducer
      return { userSymbol, results: response.data.results };
    } catch (error) {
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
