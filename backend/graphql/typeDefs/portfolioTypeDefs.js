// backend/graphql/typeDefs/portfolioTypeDefs.js
const { gql } = require('apollo-server-express');

const portfolioTypeDefs = gql`
  type Stock {
    symbol: String!
    shares: Int!
    buyPrice: Float!
    currentPrice: Float
  }

  type Portfolio {
    userId: ID!
    stocks: [Stock]!
    totalValue: Float
  }

  extend type Query {
    getPortfolio(userId: ID!): Portfolio
  }

  extend type Mutation {
    addPortfolio(userId: ID!, stocks: [StockInput]!): Portfolio
  }

  input StockInput {
    symbol: String!
    shares: Int!
    buyPrice: Float!
    currentPrice: Float
  }
`;

module.exports = portfolioTypeDefs;
