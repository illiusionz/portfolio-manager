// src/containers/AssetManagement/AssetManagement.js
import React from 'react';
import AssetManagementCard from '../../components/AssetManagementCard/AssetManagementCard';
import InvestmentCalculator from '../../components/InvesmentCalculator/InvestmentCalculator';

const AssetManagement = () => {
  return (
    <div className='container'>
      <InvestmentCalculator />
      {/*<div className='hero-section'>
        <h1>Asset Allocation</h1>
      </div>
     <AssetManagementCard />*/}
    </div>
  );
};

export default AssetManagement;
