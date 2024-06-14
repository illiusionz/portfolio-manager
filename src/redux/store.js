// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';
import newsReducer from './reducers/newsReducer';
import userReducer from './reducers/userReducer';
import watchlistReducer from './reducers/watchlistReducer';
import themeReducer from './reducers/themeReducer';

// Configure the Redux store
const store = configureStore({
  reducer: {
    stocks: stockReducer, // Reducer for managing stock-related state
    news: newsReducer, // Reducer for managing news-related state
    user: userReducer, // Reducer for managing user-related state
    watchlist: watchlistReducer, // Reducer for managing watchlist-related state
    theme: themeReducer, // Reducer for managing theme-related state
  },
});

export default store;
