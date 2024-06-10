// src/redux/reducers/userReducer.js
const initialState = {
  symbol: 'AAPL',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_SYMBOL':
      return { ...state, symbol: action.payload };
    default:
      return state;
  }
};

export default userReducer;
