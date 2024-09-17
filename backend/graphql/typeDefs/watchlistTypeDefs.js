const { gql } = require('apollo-server-express');

const watchlistTypeDefs = gql`
  type Watchlist {
    id: ID!
    userId: ID!
    stockSymbol: String!
  }

  type Query {
    getWatchlist(userId: ID!): [Watchlist]
  }

  type Mutation {
    addStockToWatchlist(userId: ID!, stockSymbol: String!): Watchlist
    removeStockFromWatchlist(userId: ID!, stockSymbol: String!): Watchlist
  }
`;

module.exports = watchlistTypeDefs;
