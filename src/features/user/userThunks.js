import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserSymbol } from './userSlice';
import { fetchStockSnapshot } from '../stocks/stockThunks';
import { fetchNews } from '../news/newsThunks';
import { fetchWatchlistData } from '../watchlist/watchlistThunks';

export const setSymbolAndFetchData = createAsyncThunk(
  'user/setSymbolAndFetchData',
  async (symbol, { dispatch }) => {
    dispatch(setUserSymbol(symbol)); // Set symbol in state

    // Fetch stock snapshot, news, and watchlist data concurrently
    await Promise.all([
      dispatch(fetchStockSnapshot(symbol)),
      dispatch(fetchNews(symbol)),
      dispatch(fetchWatchlistData([symbol])),
    ]);
  }
);
