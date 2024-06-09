import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import {
  initClient,
  handleAuthClick,
  handleSignOutClick,
} from '../utils/googleAuth';

const sheetId = 'YOUR_SHEET_ID';
const range = 'Sheet1!A1:M20';

const EditableTradePositions = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initClient();
    gapi.load('client', fetchSheetData);
  }, []);

  const fetchSheetData = () => {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: sheetId,
        range: range,
      })
      .then((response) => {
        setData(response.result.values);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      });
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedData = data.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        return row.map((cell, cIdx) => (cIdx === colIndex ? value : cell));
      }
      return row;
    });
    setData(updatedData);
  };

  const updateSheetData = () => {
    gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
          values: data,
        },
      })
      .then((response) => {
        console.log('Data updated successfully:', response);
      })
      .catch((error) => {
        console.error('Error updating data: ', error);
      });
  };

  return (
    <div className='trade-positions'>
      <h1>Trade Positions</h1>
      <button onClick={handleAuthClick}>Sign In</button>
      <button onClick={handleSignOutClick}>Sign Out</button>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
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
                  <td key={cellIndex}>
                    <input
                      type='text'
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(rowIndex, cellIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={updateSheetData}>Update Sheet</button>
    </div>
  );
};

export default EditableTradePositions;
