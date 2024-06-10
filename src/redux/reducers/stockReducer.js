// src/redux/reducers/stockReducer.js
const initialState = {
  data: [],
  loading: false,
  error: null,
};

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STOCKS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_STOCKS_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_STOCKS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default stockReducer;
