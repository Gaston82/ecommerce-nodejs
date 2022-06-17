const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user");
const Cart = require("../models/cart");

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  const cart = new Cart({ _id: user, items: [] });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  await cart.save();

  res.json({
    user,
  });
};

module.exports = {
  userPost,
};
