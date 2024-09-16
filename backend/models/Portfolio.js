const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
  symbol: String,
  shares: Number,
  avgBuyPrice: Number,
  currentPrice: Number,
  value: Number,
  percentReturn: Number,
});

const portfolioSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  holdings: [holdingSchema],
  totalValue: Number,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
