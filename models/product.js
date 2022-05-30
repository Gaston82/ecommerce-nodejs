const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
  },
  price: {
    type: String,
    required: [true, "Product price is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  avaible: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Product", ProductSchema);
