import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function TradingViewWidget({ symbol }) {
  const container = useRef();
  const theme = useSelector((state) => state.theme); // Assuming you have a theme state in your Redux store

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "D",
        "timezone": "exchange",
        "theme": "${theme}",
        "style": "1",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "save_image": false,
        "studies": [
          "ROC@tv-basicstudies",
          "StochasticRSI@tv-basicstudies",
          "MASimple@tv-basicstudies"
        ],
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650"
      }`;
    container.current.innerHTML = '';
    container.current.appendChild(script);
  }, [symbol, theme]);

  return (
    <div
      className='tradingview-widget-container'
      ref={container}
      style={{ height: '100%', width: '100%' }}>
      <div
        className='tradingview-widget-container__widget'
        style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
      <div className='tradingview-widget-copyright'>
        <a
          href='https://www.tradingview.com/'
          rel='noopener nofollow'
          target='_blank'>
          <span className='blue-text'>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default React.memo(TradingViewWidget);
