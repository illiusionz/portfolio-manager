// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/stocks/stockSlice';
import newsReducer from '../features/news/newsSlice';
import userReducer from '../features/user/userSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';
import themeReducer from '../features/theme/themeSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    news: newsReducer,
    user: userReducer,
    watchlist: watchlistReducer,
    theme: themeReducer,
    portfolio: portfolioReducer,
  },
});

export default store;
