import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './NewsFeed.css';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { symbol } = useSelector((state) => state.user);
  const apiKey = process.env.REACT_APP_POLYGON_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=12&apiKey=${apiKey}`
        );
        setNews(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    if (symbol) {
      fetchNews();
    }
  }, [symbol, apiKey]);

  if (loading) {
    return <div>Loading news...</div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div className='news-feed'>
      {news.map((article, index) => (
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
            <a
              href={article.article_url}
              target='_blank'
              rel='noopener noreferrer'
              className='news-title'>
              {article.title}
            </a>
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
