import React from 'react';
import Chart from '../Chart/Chart';
import './HeroSection.css';

const HeroSection = ({ stockData }) => {
  return (
    <div className='hero-section container mt-4'>
      <Chart stockData={stockData} />
    </div>
  );
};

export default HeroSection;
