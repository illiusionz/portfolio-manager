// src/pages/PortfolioPage.js

import React from 'react';
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
  const testUserId = 'testUserId123'; // Replace with your test user ID

  return (
    <div className='container'>
      <Portfolio userId={testUserId} />
      <p>Built with Express.js, MongoDB, GraphQL, Apollo Server</p>
    </div>
  );
};

export default PortfolioPage;
