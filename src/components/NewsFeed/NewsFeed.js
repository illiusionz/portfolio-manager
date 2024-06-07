import React, { useState, useEffect } from 'react';
import './NewsFeed.css';

const NewsFeed = ({ query }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '6kf3MOEaHc3lbVrjKbqgjqcOo7pgMZmq'; // Replace with your actual API key
      const url = `https://api.polygon.io/v2/reference/news?ticker=${query}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setArticles(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNews();
  }, [query]);

  return (
    <div className='news-feed'>
      <h3>Related News</h3>
      {error && <div className='alert alert-danger'>{error}</div>}
      {articles.length > 0 ? (
        <ul className='list-group'>
          {articles.map((article, index) => (
            <li key={index} className='list-group-item news-item'>
              <div className='news-content'>
                <div className='news-header'>
                  <span className='news-source'>{article.source}</span>
                  <span className='news-date'>
                    {new Date(article.published_utc).toLocaleTimeString()}
                  </span>
                </div>
                <a
                  href={article.article_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='news-title'>
                  {article.title}
                </a>
                <p className='news-summary'>{article.summary}</p>
                <span className='news-ticker'>{query}</span>
              </div>
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className='news-image'
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
};

export default NewsFeed;
