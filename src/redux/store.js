// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';
import newsReducer from './reducers/newsReducer';
import userReducer from './reducers/userReducer';
import watchlistReducer from './reducers/watchlistReducer';

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    news: newsReducer,
    user: userReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
