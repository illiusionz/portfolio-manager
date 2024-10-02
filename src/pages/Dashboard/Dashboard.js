import React from 'react';
import PlaidLinkComponent from '../../components/Plaid/PlaidLinkComponent';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { transactions, status, error } = useSelector((state) => state.bank);

  return (
    <div>
      <h1>Bank Transactions</h1>
      <PlaidLinkComponent />
      {status === 'loading' && <p>Loading transactions...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((txn) => (
            <li key={txn.transaction_id}>
              {txn.name}: ${txn.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default Dashboard;
