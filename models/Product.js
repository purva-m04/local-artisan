const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  artisan: {
    type: String,
    required: true
  },
  artisanPhoto: String,
  paintingUrl: String,
  region: String,
  sdgGoals: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);