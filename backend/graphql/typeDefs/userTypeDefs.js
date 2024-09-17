const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    watchlist: [String]
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = userTypeDefs;
