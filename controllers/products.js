const { response } = require("express");

const getProducts = (req, res = response) => {
  const { page = 1, limit, apikey, q } = req.query;
  res.json({
    msg: "get API -controller",
    page,
    limit,
    apikey,
    q,
  });
};

const postProducts = (req, res) => {
  const { name, price } = req.body;
  res.json({
    msg: "postt API",
    name,
    price,
  });
};
const deleteProducts = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

const updateProducts = (req, res = response) => {
  const { id } = req.params.id;
  res.json({
    msg: "put API",
    id,
  });
};

module.exports = {
  getProducts,
  postProducts,
  deleteProducts,
  updateProducts,
};
