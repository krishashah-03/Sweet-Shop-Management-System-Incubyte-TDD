const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Nut-Based",
      "Milk-Based",
      "Pastry",
      "Chocolate",
      "Candy",
      "Vegetable-Based"
    ]
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be non-negative']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be non-negative']
  }
});

module.exports = mongoose.model('Sweet', sweetSchema);
