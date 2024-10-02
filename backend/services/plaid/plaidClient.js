const path = require('path');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(config);

const logError = (error, functionName) => {
  console.error(
    `Error in ${functionName}: ${error.response?.status} - ${error.response?.data?.error_message}`
  );
};

const retry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      logError(error, fn.name);
      if (i === retries - 1) throw error;
    }
  }
};

const createLinkToken = async (userID) => {
  return retry(async () => {
    const response = await client.linkTokenCreate({
      user: { client_user_id: userID },
      client_name: 'Your App Name',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    return response.data;
  });
};

const exchangePublicToken = async (publicToken) => {
  return retry(async () => {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return response.data;
  });
};

const getTransactions = async (accessToken, startDate, endDate) => {
  return retry(async () => {
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    return response.data.transactions;
  });
};

module.exports = {
  createLinkToken,
  exchangePublicToken,
  getTransactions,
};
