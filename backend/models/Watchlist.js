const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  symbol: String,
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
