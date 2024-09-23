// src/components/NewsFeed/NewsFeed.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../../features/news/newsThunks';
import {
  selectNewsArticles,
  selectNewsLoading,
  selectNewsError,
} from '../../features/news/newsSelectors';
import './NewsFeed.scss';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const symbol = useSelector((state) => state.user.symbol);
  const articles = useSelector(selectNewsArticles);
  const loading = useSelector(selectNewsLoading);
  const error = useSelector(selectNewsError);

  useEffect(() => {
    if (symbol && !articles[symbol]) {
      dispatch(fetchNews({ symbol }));
    }
  }, [dispatch, symbol, articles]);

  if (loading) {
    return <div>Loading news...</div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

  if (!articles[symbol] || articles[symbol].length === 0) {
    return <div>No news available.</div>;
  }

  return (
    <div className='news-feed'>
      {articles[symbol]?.map((article, index) => (
        <a
          key={index}
          className='news-item'
          href={article.article_url}
          target='_blank'
          rel='noopener noreferrer'>
          <img
            src={article.image_url}
            alt={article.title}
            className='news-thumbnail'
          />
          <div className='news-content'>
            <div
              href={article.article_url}
              target='_blank'
              rel='noopener noreferrer'
              className='news-title'>
              {article.title}
            </div>
            <div className='news-date'>
              {new Date(article.published_utc).toLocaleDateString()}
            </div>
          </div>
          <img
            src={article.publisher.logo_url}
            alt={article.publisher.name}
            className='news-logo'
          />
        </a>
      ))}
    </div>
  );
};

export default NewsFeed;
