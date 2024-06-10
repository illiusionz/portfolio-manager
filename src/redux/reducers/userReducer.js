import { SET_USER_SYMBOL, SET_STOCK_PRICE } from '../actions/userActions';

const initialState = {
  symbol: null,
  stockPrice: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SYMBOL:
      return { ...state, symbol: action.payload };
    case SET_STOCK_PRICE:
      return { ...state, stockPrice: action.payload };
    default:
      return state;
  }
};

export default userReducer;
