// format.js

// Function to format a numeric value as a currency string
export const formatCurrency = (value) => {
  // Return an empty string if the value is null or undefined
  if (!value) return '';

  // Convert the value to a string and remove any non-numeric characters except for periods
  value = value.toString().replace(/[^0-9.]/g, '');

  // Split the value into integer and decimal parts
  const parts = value.split('.');

  // Add commas to the integer part of the number for better readability
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts back together and prepend a dollar sign
  return `$${parts.join('.')}`;
};

// Function to parse a currency string back into a numeric value
export const parseCurrency = (value) => {
  // Return 0 if the value is null or undefined
  if (!value) return 0;

  // Remove any non-numeric characters except for periods and convert the result to a float
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
};

// Function to format a numeric value with commas as thousand separators
export const formatNumberWithCommas = (value) => {
  // Return an empty string if the value is null or undefined
  if (!value) return '';

  // Convert the value to a string and add commas as thousand separators
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Function to format a date to 'YYYY-MM-DD'
export const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const hours = `0${d.getHours()}`.slice(-2);
  const minutes = `0${d.getMinutes()}`.slice(-2);
  const seconds = `0${d.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
