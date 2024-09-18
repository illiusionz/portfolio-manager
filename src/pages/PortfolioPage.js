// src/pages/PortfolioPage.js

import React from 'react';
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
  const testUserId = 'testUserId123'; // Replace with your test user ID

  return (
    <div>
      <h1>Stock Portfolio</h1>
      //
      <Portfolio userId={testUserId} />
    </div>
  );
};

export default PortfolioPage;
