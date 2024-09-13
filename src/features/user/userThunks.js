import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserSymbol } from './userSlice'; // Assuming this is the action from userSlice.js
import { fetchStockPrice } from '../stocks/stockThunks'; // Thunks to fetch stock price
import { fetchNews } from '../news/newsThunks'; // Thunks to fetch news
import { fetchWatchlistData } from '../watchlist/watchlistThunks'; // Thunks to fetch watchlist data

// Unified thunk action to handle setting symbol and fetching all related data
export const setSymbolAndFetchData = createAsyncThunk(
  'user/setSymbolAndFetchData',
  async (symbol, { dispatch }) => {
    // First, set the user symbol
    dispatch(setUserSymbol(symbol));

    // Then, fetch all related data
    await dispatch(fetchStockPrice(symbol));
    await dispatch(fetchNews(symbol));
    await dispatch(fetchWatchlistData([symbol])); // Adjust this if fetching for multiple symbols
  }
);
