// src/utils/format.js
export const formatNumberWithCommas = (number) => {
  if (number === null || number === undefined) {
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
