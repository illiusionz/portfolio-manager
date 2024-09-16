import React from 'react';

const PortfolioTable = ({ holdings = [] }) => {
  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Portfolio</h2>
      <table className='min-w-full table-auto border-collapse'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='p-2 border-b-2 border-gray-300'>Symbol</th>
            <th className='p-2 border-b-2 border-gray-300'>Shares</th>
            <th className='p-2 border-b-2 border-gray-300'>
              Average Buy Price
            </th>
          </tr>
        </thead>
        <tbody>
          {holdings.length > 0 ? (
            holdings.map((holding) => (
              <tr
                key={holding.symbol}
                className='text-center bg-white hover:bg-gray-50'>
                <td className='p-2 border-b'>{holding.symbol}</td>
                <td className='p-2 border-b'>{holding.shares}</td>
                <td className='p-2 border-b'>${holding.avgBuyPrice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3' className='p-4 text-center'>
                No holdings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;
