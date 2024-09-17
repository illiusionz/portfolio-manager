const Portfolio = require('../../models/Portfolio');

const portfolioResolvers = {
  Query: {
    getPortfolio: async (_, { userId }) => {
      return await Portfolio.find({ userId });
    },
  },
  Mutation: {
    addStockToPortfolio: async (
      _,
      { userId, symbol, shares, purchasePrice, purchaseDate }
    ) => {
      const portfolio = await Portfolio.findOne({ userId });
      if (!portfolio) {
        const newPortfolio = new Portfolio({
          userId,
          stocks: [{ symbol, shares, purchasePrice, purchaseDate }],
        });
        return await newPortfolio.save();
      } else {
        portfolio.stocks.push({ symbol, shares, purchasePrice, purchaseDate });
        return await portfolio.save();
      }
    },
    removeStockFromPortfolio: async (_, { userId, symbol }) => {
      return await Portfolio.findOneAndUpdate(
        { userId },
        { $pull: { stocks: { symbol } } },
        { new: true }
      );
    },
  },
};

module.exports = portfolioResolvers;
