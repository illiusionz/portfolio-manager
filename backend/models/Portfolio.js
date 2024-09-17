// models/Portfolio.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const portfolioSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stocks: [stockSchema], // array of stock objects
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
