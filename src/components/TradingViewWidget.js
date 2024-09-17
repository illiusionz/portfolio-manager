import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function TradingViewWidget({ symbol }) {
  const container = useRef();
  const theme = useSelector((state) => state.theme || 'light');
  const widgetInitialized = useRef(false); // Track widget initialization

  useEffect(() => {
    const initializeWidget = () => {
      if (!symbol) {
        console.error('Invalid or missing symbol for TradingView widget');
        return;
      }

      if (!container.current) {
        console.error('Container for TradingView widget is not available');
        return;
      }

      // Prevent reinitialization if the widget is already initialized
      if (widgetInitialized.current) {
        console.log('Widget already initialized');
        return;
      }

      container.current.innerHTML = ''; // Clear previous widget content

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
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650',
      });

      container.current.appendChild(script);
      widgetInitialized.current = true; // Mark the widget as initialized
      console.log('Widget initialized successfully');
    };

    setTimeout(() => {
      initializeWidget(); // Add a delay to ensure the DOM is ready
    }, 500); // Reduce the delay to 500ms or adjust as needed

    return () => {
      if (container.current) {
        container.current.innerHTML = ''; // Cleanup previous widget content on unmount
        widgetInitialized.current = false; // Reset initialization status
        console.log('Cleaning up widget');
      }
    };
  }, [symbol, theme]); // Reinitialize when symbol or theme changes

  return (
    <div
      className='tradingview-widget-container'
      ref={container}
      style={{ height: '500px', width: '100%' }}>
      <div
        className='tradingview-widget-container__widget'
        style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}

export default React.memo(TradingViewWidget);
