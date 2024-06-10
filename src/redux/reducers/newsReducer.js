// src/redux/reducers/newsReducer.js
const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEWS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_NEWS_SUCCESS':
      return { ...state, loading: false, articles: action.payload };
    case 'FETCH_NEWS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
