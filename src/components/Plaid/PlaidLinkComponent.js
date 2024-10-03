import React, { memo } from 'react';
import { usePlaidLinkManager } from '../../hooks/usePlaidLinkManager';

const PlaidLinkComponent = memo(() => {
  const { open, ready, loading, error } = usePlaidLinkManager();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect Bank Account
    </button>
  );
});

export default PlaidLinkComponent;
