import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.css';

const NewsFeed = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=12&apiKey=${apiKey}`
        );
        setNews(response.data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    if (symbol) {
      fetchNews();
    }
  }, [symbol]);

  return (
    <div className='news-feed'>
      {news.map((article, index) => (
        <div key={index} className='news-item'>
          <img src={article.image_url} alt={article.title} />
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
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
