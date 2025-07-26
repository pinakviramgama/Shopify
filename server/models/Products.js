const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
    },
    title: String,
    description: String,
    price: Number,
    brand: String,
    category: String,
    salePrice: Number,
    totalStock: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
