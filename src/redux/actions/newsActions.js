import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk('news/fetchNews', async (symbol) => {
  const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';
  const response = await fetch(
    `https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=12&apiKey=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const data = await response.json();
  return data.results;
});
