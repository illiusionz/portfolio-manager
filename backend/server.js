// server.js
const path = require('path');
const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db'); // Path to your db.js
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema'); // Your combined GraphQL schema
const portfolioRoutes = require('./routes/api/portfolioRoute');
require('dotenv').config({ path: path.join(__dirname, '../../.env') }); // Adjust the path as needed

const plaidRoutes = require('./routes/plaidRoutes');

const app = express();

// Enable CORS for all routes and methods
app.use(cors());

// Connect to MongoDB
connectDB();

// Store the apolloServer instance in a variable
let apolloServer;

// Apollo Server Setup Function
const setupApolloServer = async () => {
  try {
    apolloServer = new ApolloServer({
      schema,
      context: ({ req }) => {
        // Add any authentication or other context here
      },
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    console.log(`Apollo Server running at /graphql`);
  } catch (err) {
    console.error('Apollo Server Error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Middleware: Consider adding logging here (e.g., morgan)
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/plaid', plaidRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Start Apollo Server
setupApolloServer();

// Start Express Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
});
