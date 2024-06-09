// src/utils/googleSheetsAPI.js

export async function fetchGoogleSheetData(sheetId, range, apiKey) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  );
  const data = await response.json();
  return data;
}
