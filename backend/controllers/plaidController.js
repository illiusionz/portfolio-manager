const plaid = require('plaid');
const client = require('../services/plaid/plaidClient');

exports.createLinkToken = async (req, res) => {
  try {
    const clientUserId = 'user-123'; // Use a proper unique user id
    const linkTokenResponse = await client.linkTokenCreate({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'Your App Name',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      redirect_uri: 'http://localhost:3000/your-redirect-url',
    });

    res.json({ link_token: linkTokenResponse.link_token });
  } catch (err) {
    console.error('Error creating link token:', err);
    res.status(500).json({ error: 'Failed to create link token' });
  }
};

exports.exchangePublicToken = async (req, res) => {
  try {
    const { public_token } = req.body;
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token,
    });
    const accessToken = tokenResponse.access_token;
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { accessToken } = req.body;
    const startDate = '2020-01-01'; // Customize as needed
    const endDate = '2021-01-01'; // Customize as needed
    const transactionsResponse = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    res.json(transactionsResponse.transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
