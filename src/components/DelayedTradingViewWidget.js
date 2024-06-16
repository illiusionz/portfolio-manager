import React, { useState, useEffect } from 'react';
import TradingViewWidget from './TradingViewWidget';

const DelayedTradingViewWidget = ({ symbol }) => {
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
      console.log('Showing TradingView widget after delay.');
    }, 3000); // Delay of 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWidget ? (
        <TradingViewWidget symbol={symbol} />
      ) : (
        <div>Loading widget...</div>
      )}
    </>
  );
};

export default DelayedTradingViewWidget;
