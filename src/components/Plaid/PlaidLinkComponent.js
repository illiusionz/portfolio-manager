import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useDispatch } from 'react-redux';
import { fetchTransactions } from '../../features/bank/bankSlice';

const PlaidLinkComponent = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/plaid/create_link_token', {
          method: 'POST',
        });
        const data = await response.json();
        setLinkToken(data.link_token);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch link token');
        setLoading(false);
      }
    };

    if (!linkToken && !window.Plaid) {
      fetchLinkToken();
    }
  }, [linkToken]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect Bank Account
    </button>
  );
};

export default PlaidLinkComponent;
