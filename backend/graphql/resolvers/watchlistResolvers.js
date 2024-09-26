const Watchlist = require('../../models/WatchlistModel');

const watchlistResolvers = {
  Query: {
    getWatchlist: async (_, { userId }) => {
      return await Watchlist.find({ userId });
    },
  },
  Mutation: {
    addStockToWatchlist: async (_, { userId, stockSymbol }) => {
      const newStock = new Watchlist({ userId, stockSymbol });
      return await newStock.save();
    },
    removeStockFromWatchlist: async (_, { userId, stockSymbol }) => {
      return await Watchlist.findOneAndDelete({ userId, stockSymbol });
    },
  },
};

module.exports = watchlistResolvers;
