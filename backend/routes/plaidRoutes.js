const express = require('express');
const router = express.Router();
const plaid = require('plaid');
const client = require('../services/plaid/plaidClient'); // Assuming you are using a Plaid client setup

const plaidController = require('../controllers/plaidController');

// Route to create a Plaid link token
router.post('/create_link_token', async (req, res) => {
  try {
    // Dummy user ID since there's no auth setup yet
    const clientUserId = 'test-user';

    const linkTokenResponse = await client.linkTokenCreate({
      user: { client_user_id: clientUserId },
      client_name: 'Your App Name',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://yourwebhook.example.com',
      redirect_uri: 'http://localhost:3000/your-redirect-uri', // Adjust if needed
    });

    console.log('Link Token:', linkTokenResponse);
    res.json(linkTokenResponse.data); // Return the token response to the client
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: 'Failed to create link token' });
  }
});

// Route to exchange the public token for an access token
router.post('/exchange_public_token', plaidController.exchangePublicToken);

// Route to fetch transactions using the access token
router.post('/get_transactions', plaidController.getTransactions);

module.exports = router;
