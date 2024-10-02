import { usePlaidLink } from 'react-plaid-link';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../features/bank/bankSlice';

export const usePlaidLinkHook = (linkToken) => {
  const dispatch = useDispatch();

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      const res = await fetch('/api/plaid/exchange_public_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      });
      const { access_token } = await res.json();
      dispatch(fetchTransactions(access_token));
    },
  });

  return { open, ready };
};
