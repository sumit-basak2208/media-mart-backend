const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
  },
  type: {
    type: String,
    default: "FOOD",
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
    default: "",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
