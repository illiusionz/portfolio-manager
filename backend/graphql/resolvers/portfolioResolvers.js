const Portfolio = require('../../models/PortfolioModel');

const portfolioResolvers = {
  Query: {
    getPortfolio: async (_, { userId }) => {
      try {
        console.log('Received userId:', userId);

        // Directly query with string userId
        const portfolio = await Portfolio.findOne({ userId });
        if (!portfolio) {
          console.log('Portfolio not found for userId:', userId);
          throw new Error('Portfolio not found');
        }

        console.log('Found portfolio:', portfolio);
        return portfolio;
      } catch (err) {
        console.error('Error in getPortfolio:', err);
        throw new Error('Error fetching portfolio');
      }
    },
  },
  Mutation: {
    addPortfolio: async (_, { userId, stocks }) => {
      try {
        // Use userId as a string (remove ObjectId conversion)
        let portfolio = await Portfolio.findOne({ userId });
        if (portfolio) {
          // Update existing portfolio
          portfolio.stocks = stocks;
        } else {
          // Create a new portfolio
          portfolio = new Portfolio({
            userId,
            stocks,
            totalValue: stocks.reduce(
              (total, stock) => total + stock.shares * stock.currentPrice,
              0
            ),
          });
        }

        await portfolio.save();
        return portfolio;
      } catch (err) {
        console.error('Error saving portfolio:', err);
        throw new Error('Error saving portfolio');
      }
    },
  },
};

module.exports = portfolioResolvers;
