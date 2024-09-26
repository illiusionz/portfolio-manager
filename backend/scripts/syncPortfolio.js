// syncPortfolio.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db'); // Import the connection function
const Portfolio = require('../models/PortfolioModel'); // Adjust the path as needed

// File path to the local portfolio.json
const filePath = path.join(__dirname, '../data/portfolio.json');

// Read the portfolio.json file and sync to MongoDB
const syncPortfolio = async () => {
  try {
    // Connect to the database
    await connectDB();

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const portfolio = JSON.parse(data);

    // If portfolio is an object, convert it to an array for iteration
    const portfolios = Array.isArray(portfolio) ? portfolio : [portfolio];

    for (const portfolio of portfolios) {
      const { userId, stocks } = portfolio;

      if (!userId || !stocks) {
        console.warn(
          `Invalid data format in portfolio: ${JSON.stringify(portfolio)}`
        );
        continue; // Skip invalid entries
      }

      // Find the existing portfolio in MongoDB
      let existingPortfolio = await Portfolio.findOne({ userId });

      if (existingPortfolio) {
        // Update the existing portfolio
        existingPortfolio.stocks = stocks;
      } else {
        // Create a new portfolio
        existingPortfolio = new Portfolio({
          userId,
          stocks,
          totalValue: stocks.reduce(
            (total, stock) => total + stock.shares * stock.currentPrice,
            0
          ),
        });
      }

      // Save the portfolio to the database
      await existingPortfolio.save();
      console.log(`Portfolio for user ${userId} synced successfully`);
    }
  } catch (error) {
    console.error('Error syncing portfolio:', error);
  } finally {
    mongoose.connection.close(); // Close the connection after syncing
  }
};

// Call the sync function
syncPortfolio();
