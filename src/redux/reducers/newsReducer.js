import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from '../actions/newsActions';

// Create a slice of the Redux store to manage news data
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [], // Array to store fetched news articles
    loading: false, // Loading state to indicate whether news data is being fetched
    error: null, // Error state to store any errors encountered during the fetch process
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle different states of the fetchNews async action
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
