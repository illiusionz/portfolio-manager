import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'; // Correct import
import stockReducer from '../features/stocks/stockSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'stocks', 'theme', 'watchlist'], // Whitelist slices to persist
};

// Combine reducers
const rootReducer = combineReducers({
  stocks: stockReducer,
  user: userReducer,
  theme: themeReducer,
  watchlist: watchlistReducer,
});

// Persist the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);
export default store;
