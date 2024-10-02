const plaidClient = require('../services/plaid/plaidClient');

exports.createLinkToken = async (req, res) => {
  try {
    const userId = 'test-user-id'; // Hardcoded user ID for development (you can replace this later)
    console.log('Creating link token for user:', userId); // Add logging for debugging
    const response = await plaidClient.createLinkToken(userId);
    console.log('Link token created successfully:', response); // Add logging
    res.json(response);
  } catch (error) {
    console.error('Error creating link token:', error.message);
    res.status(500).json({ error: 'Failed to create link token' });
  }
};

exports.exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;
  try {
    const response = await plaidClient.exchangePublicToken(public_token);
    res.json({ access_token: response.access_token });
  } catch (error) {
    console.error('Error exchanging public token:', error.message);
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
};

exports.getTransactions = async (req, res) => {
  const { access_token, start_date, end_date } = req.body;
  try {
    const transactions = await plaidClient.getTransactions(
      access_token,
      start_date,
      end_date
    );
    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ error: 'Unable to fetch transactions' });
  }
};
