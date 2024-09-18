// src/features/portfolio/portfolioSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch portfolio data from backend
export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async (userId) => {
    const response = await fetch(
      `http://localhost:5001/api/portfolio/${userId}`
    );
    const data = await response.json();
    console.log('Received data:', data);
    return data;
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    portfolio: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default portfolioSlice.reducer;
