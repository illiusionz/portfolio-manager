const { gql } = require('apollo-server-express');

const portfolioTypeDefs = gql`
  type Stock {
    symbol: String!
    shares: Int!
    purchasePrice: Float!
    purchaseDate: String!
  }

  type Portfolio {
    id: ID!
    userId: ID!
    stocks: [Stock!]!
    createdAt: String!
  }

  type Query {
    getPortfolio(userId: ID!): [Portfolio]
  }

  type Mutation {
    addStockToPortfolio(
      userId: ID!
      symbol: String!
      shares: Int!
      purchasePrice: Float!
      purchaseDate: String
    ): Portfolio
    removeStockFromPortfolio(userId: ID!, symbol: String!): Portfolio
  }
`;

module.exports = portfolioTypeDefs;
