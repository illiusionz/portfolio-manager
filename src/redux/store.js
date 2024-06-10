import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';
import userReducer from './reducers/userReducer';
import newsReducer from './reducers/newsReducer';

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    user: userReducer,
    news: newsReducer,
  },
});

export default store;
