import React from 'react';
import PlaidLinkComponent from '../../components/Plaid/PlaidLinkComponent';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const transactions = useSelector((state) => state.bank.transactions);

  return (
    <div>
      <h1>Bank Transactions</h1>
      <PlaidLinkComponent />
      <div>
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
    </div>
  );
};

export default Dashboard;
