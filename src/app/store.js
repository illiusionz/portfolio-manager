// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/stocks/stockSlice';
import newsReducer from '../features/news/newsSlice';
import userReducer from '../features/user/userSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';
import themeReducer from '../features/theme/themeSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';
import bankReducer from '../features/bank/bankSlice';

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith('user/')) {
    console.log('User state after action:', storeAPI.getState().user);
  }
  /*if (action.type.startsWith('stocks/')) {
    console.log('Stocks state after action:', storeAPI.getState().stocks);
  }*/
  return result;
};

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    news: newsReducer,
    user: userReducer,
    watchlist: watchlistReducer,
    theme: themeReducer,
    portfolio: portfolioReducer,
    bank: bankReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
