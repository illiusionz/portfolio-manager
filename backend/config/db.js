const mongoose = require('mongoose');
require('dotenv').config(); // Automatically loads the .env file from the root

// MongoDB URI fallback for local development
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    // Retry mechanism
    //setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

module.exports = connectDB;
