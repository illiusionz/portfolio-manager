const { gql } = require('apollo-server-express');

// GraphQL Schema Definition
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers for the schema
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

module.exports = { typeDefs, resolvers };
