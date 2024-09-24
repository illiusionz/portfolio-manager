import { createSlice } from '@reduxjs/toolkit';
import { fetchWatchlistData } from './watchlistThunks';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    symbols: [],
    data: [],
    error: null,
    loading: false,
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
    builder
      .addCase(fetchWatchlistData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlistData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWatchlistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
