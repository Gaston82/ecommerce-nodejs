const { response } = require("express");
const Cart = require("../models/cart");

const addToCart = async (req, res = response) => {
  const { idProduct, amount } = req.body;
  const { uid } = req.params;
  const result = await Cart.findByIdAndUpdate(
    uid,
    {
      $push: {
        items: {
          _id: idProduct,
          amount,
        },
      },
    },
    { new: true }
  ).populate("items._id", "title price");
  res.json({
    result,
  });
};

const getProductsFromCart = async (req, res) => {
  const { uid } = req.params;
  const cart = await Cart.findById(uid).populate("items._id", "title price");
  res.json({
    cart,
  });
};

const removeProductFromCart = async (req, res) => {
  const { uid } = req.params;
  const { idProduct } = req.body;
  const result = await Cart.findByIdAndUpdate(
    uid,
    {
      $pull: {
        items: {
          _id: idProduct,
        },
      },
    },
    { new: true }
  );

  res.json({
    result,
  });
};

module.exports = {
  addToCart,
  getProductsFromCart,
  removeProductFromCart,
};
