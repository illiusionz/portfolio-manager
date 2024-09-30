// utils/tableSortUtils.js

/**
 * Sorts an array of objects based on a specific column and direction.
 *
 * @param {Array} data - The array of objects to sort.
 * @param {String} column - The column key to sort by.
 * @param {String} direction - The sort direction, either 'asc' for ascending or 'desc' for descending.
 * @returns {Array} - The sorted array.
 */
export const sortTableData = (data, column, direction = 'asc') => {
  return [...data].sort((a, b) => {
    if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
    if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Determines the sort direction based on the current sort direction and column.
 *
 * @param {String} sortedColumn - The current sorted column.
 * @param {String} column - The column to be sorted.
 * @param {String} currentDirection - The current sort direction, either 'asc' or 'desc'.
 * @returns {String} - The new sort direction, either 'asc' or 'desc'.
 */
export const getSortDirection = (sortedColumn, column, currentDirection) => {
  // Default to ascending if a new column is selected
  if (sortedColumn !== column) {
    return 'asc';
  }
  // Toggle between 'asc' and 'desc' for the same column
  return currentDirection === 'asc' ? 'desc' : 'asc';
};

/**
 * Handles the entire table sorting process and returns the updated state.
 *
 * @param {Array} data - The data to be sorted.
 * @param {String} column - The column to be sorted.
 * @param {String} sortedColumn - The currently sorted column.
 * @param {String} sortDirection - The current sort direction.
 * @returns {Object} - The updated state including sorted data, column, and direction.
 */
export const handleTableSort = (data, column, sortedColumn, sortDirection) => {
  const direction = getSortDirection(sortedColumn, column, sortDirection);
  const sortedData = sortTableData(data, column, direction);
  return {
    sortedData,
    sortedColumn: column,
    sortDirection: direction,
  };
};
