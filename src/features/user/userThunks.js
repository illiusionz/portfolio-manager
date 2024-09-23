import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserSymbol } from './userSlice';
import { fetchStockSnapshot } from '../stocks/stockThunks';
import { fetchNews } from '../news/newsThunks';
import { fetchWatchlistData } from '../watchlist/watchlistThunks';

export const setSymbolAndFetchData = createAsyncThunk(
  'user/setSymbolAndFetchData',
  async (userSymbol, { dispatch }) => {
    dispatch(setUserSymbol(userSymbol));
    await dispatch(fetchStockSnapshot(userSymbol));
    await dispatch(fetchNews(userSymbol));
    await dispatch(fetchWatchlistData([userSymbol]));
  }
);
