const plaid = require('plaid');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Plaid client
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox, // Use 'development' or 'production' as needed
});

/**
 * Function to create a link token for the Plaid Link UI
 */
const createLinkToken = async (userID) => {
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: userID, // Unique user ID
      },
      client_name: 'Your App Name',
      products: ['transactions'], // List of Plaid products to access
      country_codes: ['US'], // Specify country
      language: 'en', // Language of the Plaid Link UI
    });
    return response;
  } catch (error) {
    throw new Error(`Error creating link token: ${error.message}`);
  }
};

/**
 * Function to exchange a public token for an access token
 */
const exchangePublicToken = async (publicToken) => {
  try {
    const response = await client.exchangePublicToken(publicToken);
    return response;
  } catch (error) {
    throw new Error(`Error exchanging public token: ${error.message}`);
  }
};

/**
 * Function to fetch transactions using the access token
 */
const getTransactions = async (accessToken, startDate, endDate) => {
  try {
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    return response.transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};

module.exports = {
  createLinkToken,
  exchangePublicToken,
  getTransactions,
};
