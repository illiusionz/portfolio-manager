import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function TradingViewWidget({ symbol = 'AAPL' }) {
  const container = useRef();
  const theme = useSelector((state) => state.theme || 'light'); // Default to light theme

  useEffect(() => {
    const initializeWidget = () => {
      try {
        const script = document.createElement('script');
        script.src =
          'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;

        script.innerHTML = JSON.stringify({
          autosize: true,
          symbol: symbol,
          interval: 'D',
          timezone: 'exchange',
          theme: theme,
          style: '1',
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          studies: [
            'ROC@tv-basicstudies',
            'StochasticRSI@tv-basicstudies',
            'MASimple@tv-basicstudies',
          ],
          show_popup_button: true,
          popup_width: '1000',
          popup_height: '650',
        });

        container.current.innerHTML = ''; // Clear any previous content
        container.current.appendChild(script); // Append the new script
      } catch (error) {
        console.error('Error initializing TradingView widget:', error);
      }
    };

    // Check if the container is ready before initializing the widget
    if (container.current) {
      initializeWidget();
    }
  }, [symbol, theme]);

  return (
    <div
      className='tradingview-widget-container'
      ref={container}
      style={{ height: '100%', width: '100%' }}>
      <div
        className='tradingview-widget-container__widget'
        style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
    </div>
  );
}

export default React.memo(TradingViewWidget);
