const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: {
    type: Number,
    required: true,
  },

  restaurant: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      id: String,
      name: String,
      price: Number,
      cookTime: Number,
      category: String,
      qty: Number,
    },
  ],

  subtotal: Number,
  tax: Number,
  fee: Number,
  total: Number,

  transit: String,
  arrivalEta: Number,

  status: {
    type: String,
    default: "Order Placed",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);