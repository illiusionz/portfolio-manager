import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../features/bank/bankSlice';

export const usePlaidLinkManager = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        setLoading(true);
        console.log('Fetching link token...');

        const response = await fetch('/api/plaid/create_link_token', {
          method: 'POST', // This must match the backend
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch link token. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setLinkToken(data.link_token);
        setLoading(false);
        console.log('Link token received:', data.link_token);
      } catch (err) {
        setError('Failed to fetch link token');
        setLoading(false);
        console.error('Error fetching link token:', err);
      }
    };

    if (!linkToken && !window.Plaid) {
      fetchLinkToken();
    }
  }, [linkToken]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      try {
        console.log('Public token received:', public_token);
        const res = await fetch('/api/plaid/exchange_public_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        });
        const { access_token } = await res.json();
        console.log('Access token received:', access_token);
        dispatch(fetchTransactions({ accessToken: access_token }));
      } catch (err) {
        console.error('Error exchanging public token:', err);
      }
    },
  });

  return { open, ready, loading, error };
};
