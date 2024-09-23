// src/features/news/newsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './newsThunks';

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: {}, // Store articles as an object with symbols as keys
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const { userSymbol, results } = action.payload;
        state.loading = false;
        state.articles[userSymbol] = results; // Store results by symbol
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.articles[action.meta.arg.userSymbol] = []; // Fallback to empty array on error
      });
  },
});

export default newsSlice.reducer;
