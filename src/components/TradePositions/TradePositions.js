import React, { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '../../utils/googleSheetsAPI';
import './TradePositions.scss';

const sheetId = process.env.REACT_APP_SHEET_ID;
const range = 'Sheet1!A1:M20';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const TradePositions = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const sheetData = await fetchGoogleSheetData(sheetId, range, apiKey);
        setData(sheetData.values);
      } catch (error) {
        setError('Failed to fetch data from Google Sheets');
        console.error('Error fetching Google Sheets data:', error);
      }
    };
    getData();
  }, [sheetId, range, apiKey]);

  return (
    <div className='trade-positions'>
      <h1>Trade Positions</h1>
      {error && <div className='error'>{error}</div>}
      {data ? (
        <table>
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TradePositions;
