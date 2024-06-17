// src/features/watchlist/watchlistSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchWatchlistData } from './watchlistThunks';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    symbols: [],
    data: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      state.symbols.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.symbols = state.symbols.filter(
        (symbol) => symbol !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWatchlistData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
