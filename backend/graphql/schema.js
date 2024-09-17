const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Import your type definitions
const portfolioTypeDefs = require('./typeDefs/portfolioTypeDefs');
const watchlistTypeDefs = require('./typeDefs/watchlistTypeDefs');
const userTypeDefs = require('./typeDefs/userTypeDefs');

// Import your resolvers
const portfolioResolvers = require('./resolvers/portfolioResolvers');
const watchlistResolvers = require('./resolvers/watchlistResolvers');
const userResolvers = require('./resolvers/userResolvers');

// Merge type definitions and resolvers
const typeDefs = mergeTypeDefs([
  portfolioTypeDefs,
  watchlistTypeDefs,
  userTypeDefs,
]);
const resolvers = mergeResolvers([
  portfolioResolvers,
  watchlistResolvers,
  userResolvers,
]);

// Create the executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
