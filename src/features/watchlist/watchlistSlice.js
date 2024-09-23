// src/features/watchlist/watchlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchWatchlistData } from './watchlistThunks';

const initialState = {
  symbols: JSON.parse(localStorage.getItem('userWatchlist')) || [], // Initialize with localStorage
  data: {}, // Store data for each symbol
  error: null,
  loading: false,
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.symbols.includes(action.payload)) {
        state.symbols.push(action.payload);
        localStorage.setItem('userWatchlist', JSON.stringify(state.symbols)); // Save to localStorage
      }
    },
    removeFromWatchlist: (state, action) => {
      state.symbols = state.symbols.filter(
        (symbol) => symbol !== action.payload
      );
      localStorage.setItem('userWatchlist', JSON.stringify(state.symbols)); // Update localStorage
      delete state.data[action.payload]; // Remove data associated with the symbol
    },
    setWatchlistSymbols: (state, action) => {
      state.symbols = action.payload;
      localStorage.setItem('userWatchlist', JSON.stringify(state.symbols)); // Update localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlistData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlistData.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((stockData) => {
          state.data[stockData.ticker] = stockData; // Store data keyed by symbol
        });
        state.error = null;
      })
      .addCase(fetchWatchlistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToWatchlist, removeFromWatchlist, setWatchlistSymbols } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
