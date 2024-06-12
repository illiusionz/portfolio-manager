import { createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

export const fetchNews = createAsyncThunk('news/fetchNews', async (symbol) => {
  const response = await fetch(
    `https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=12&apiKey=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const data = await response.json();
  return data.results;
});
