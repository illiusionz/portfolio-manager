// src/components/NewsFeed/NewsFeed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.css';

const NewsFeed = ({ symbol }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news`,
          {
            params: {
              ticker: symbol,
              apiKey: '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq',
            },
          }
        );
        setNews(response.data.results || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [symbol]);

  return (
    <div className='news-feed'>
      <h1>Recent News</h1>
      <div className='row'>
        {news.map((article, index) => (
          <div className='col-md-2 mb-3' key={index}>
            <div className='card'>
              {article.image_url && (
                <img
                  src={article.image_url}
                  className='card-img-top'
                  alt={article.title}
                />
              )}
              <div className='card-body'>
                <h5 className='card-title'>
                  <a
                    href={article.article_url}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {article.title}
                  </a>
                </h5>
                <p className='card-text'>
                  <small className='text-muted'>
                    {new Date(article.published_utc).toLocaleDateString()}
                  </small>
                </p>
                <div className='card-footer'>
                  <img
                    src={article.publisher.logo_url}
                    alt={article.publisher.name}
                    className='publisher-logo'
                  />
                  <strong>{article.ticker}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
