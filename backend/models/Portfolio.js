// backend/models/Portfolio.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  userId: { type: String, ref: 'User', required: true },
  stocks: [
    {
      symbol: { type: String, required: true },
      shares: { type: Number, required: true },
      buyPrice: { type: Number, required: true },
      currentPrice: { type: Number, required: false },
    },
  ],
  totalValue: { type: Number },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
