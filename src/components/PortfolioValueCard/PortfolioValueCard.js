import React from 'react';
import './_portfolioValueCard.scss';

const PortfolioValueCard = ({ totalValue }) => {
  return (
    <div className='card mb-3 portfolio-card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Total Portfolio Value</h5>
      </div>
      <div className='card-body'>
        <h2 className='card-text text-success'>
          ${totalValue.toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default PortfolioValueCard;
