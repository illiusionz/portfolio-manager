// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import using named export
import stockReducer from './reducers/stockReducer';
import userReducer from './reducers/userReducer';
import newsReducer from './reducers/newsReducer';

const rootReducer = combineReducers({
  stocks: stockReducer,
  user: userReducer,
  news: newsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
