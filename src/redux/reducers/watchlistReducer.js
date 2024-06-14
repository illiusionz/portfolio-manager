import {
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  SET_WATCHLIST_DATA,
} from '../actions/watchlistActions';

// Initial state for the watchlist
const initialState = {
  symbols: [], // List of stock symbols in the watchlist
  data: [], // Data related to the stocks in the watchlist
};

// Reducer function to handle actions related to the watchlist
const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        symbols: [...state.symbols, action.payload],
      };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        symbols: state.symbols.filter((symbol) => symbol !== action.payload),
      };
    case SET_WATCHLIST_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
