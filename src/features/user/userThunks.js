import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserSymbol } from './userSlice';
import { fetchStockSnapshot } from '../stocks/stockThunks';
import { fetchNews } from '../news/newsThunks';

export const setSymbolAndFetchData = createAsyncThunk(
  'user/setSymbolAndFetchData',
  async (symbol, { dispatch }) => {
    dispatch(setUserSymbol(symbol));
    await dispatch(fetchStockSnapshot(symbol));
    await dispatch(fetchNews(symbol));
  }
);
