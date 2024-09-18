// src/containers/AssetManagement/AssetManagement.js
import React, { useEffect, Suspense, lazy, useState } from 'react';

const NewsFeed = lazy(() => import('../../components/NewsFeed/NewsFeed'));

const StockNewsPage = () => {
  return (
    <div className='container mt-4'>
      <div className='hero-section'>
        <h1>Stock New Page</h1>
        <NewsFeed />
      </div>
    </div>
  );
};

export default StockNewsPage;
