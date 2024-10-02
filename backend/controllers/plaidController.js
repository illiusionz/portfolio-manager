const plaidClient = require('../services/plaidServices');

// Create a link token for Plaid Link
exports.createLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-id' },
      client_name: 'Budgeting App',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exchange public token for access token
exports.exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.exchangePublicToken(public_token);
    res.json({ access_token: response.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch transactions
exports.getTransactions = async (req, res) => {
  const { access_token } = req.body;
  const startDate = '2023-01-01';
  const endDate = '2023-12-31';

  try {
    const response = await plaidClient.transactionsGet({
      access_token: access_token,
      start_date: startDate,
      end_date: endDate,
    });
    res.json(response.transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
