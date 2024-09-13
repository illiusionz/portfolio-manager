// src/features/news/newsSelectors.js
export const selectNewsArticles = (state) => state.news.articles;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;
