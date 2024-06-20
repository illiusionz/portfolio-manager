import React, { useEffect, Suspense, lazy, useState } from 'react';
import { fetchNews } from '../../features/news/newsThunks'; // Updated path

import './StockNewsPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const NewsFeed = lazy(() => import('../../components/NewsFeed/NewsFeed'));

const StockNewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className='stocknews-container m-2'>
      <h1 className='stocknews-title page-title'>Stock News</h1>
      <NewsFeed />
    </div>
  );
};

export default StockNewsPage;
