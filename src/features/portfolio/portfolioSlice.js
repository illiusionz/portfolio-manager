import { createSlice } from '@reduxjs/toolkit';

// Hardcoded initial state for the portfolio
const initialState = {
  holdings: [
    { symbol: 'AAPL', shares: 10, avgBuyPrice: 145 },
    { symbol: 'GOOG', shares: 5, avgBuyPrice: 2750 },
    { symbol: 'TSLA', shares: 7, avgBuyPrice: 625 },
  ],
  totalValue: 0, // You can calculate this dynamically later
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addHolding: (state, action) => {
      state.holdings.push(action.payload);
    },
    updateHolding: (state, action) => {
      const index = state.holdings.findIndex(
        (h) => h.symbol === action.payload.symbol
      );
      if (index !== -1) {
        state.holdings[index] = action.payload;
      }
    },
    setPortfolio: (state, action) => {
      return { ...state, ...action.payload }; // Use this for dynamic fetching later
    },
  },
});

export const { addHolding, updateHolding, setPortfolio } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
