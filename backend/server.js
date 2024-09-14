const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema'); // Import GraphQL schema and resolvers
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .then(() => console.log(process.env.MONGO_URI))
  .catch((err) => console.log(err));

// Add this line to check if the environment variable is loaded correctly

// GraphQL ApolloServer setup
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Example endpoint
app.get('/', (req, res) => {
  res.send('GraphQL server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
