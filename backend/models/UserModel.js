const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  portfolioId: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
});

module.exports = mongoose.model('User', userSchema);
