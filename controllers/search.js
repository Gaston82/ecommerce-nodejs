const { response } = require("express");
const { Categorie, Product } = require("../models");
const { ObjectId } = require("mongoose").Types;

const collections = ["products", "categories"];

const searchByCategory = async (keyword = "", res = response) => {
  const isMongoId = ObjectId.isValid(keyword);
  if (isMongoId) {
    const category = await Categorie.findById(keyword);
    return res.json({
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(keyword, "i");
  const categories = await Categorie.find({
    name: regex,
    status: true,
  });
  res.json({
    results: categories,
  });
};
const searchByProduct = async (keyword = "", res = response) => {
  const isMongoId = ObjectId.isValid(keyword);
  if (isMongoId) {
    const product = await Product.findById(keyword).populate(
      "category",
      "name"
    );
    return res.json({
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(keyword, "i");
  const products = await Product.find({
    title: regex,
    // status: true,
  }).populate("category", "name");
  res.json({
    results: products,
  });
};
const searchProductByCategory = async (keyword = "", res = response) => {
  const isMongoId = ObjectId.isValid(keyword);
  if (isMongoId) {
    const product = await Product.find({ category: keyword }).populate(
      "category",
      "name"
    );
    return res.json({
      results: product ? [product] : [],
    });
  }
};

const search = (req, res = response) => {
  const { collection, keyword } = req.params;

  if (!collections.includes(collection)) {
    return res.status(400).json({
      msg: `You can search : ${collections}`,
    });
  }

  switch (collection) {
    case "categories":
      searchByCategory(keyword, res);
      break;
    // case "products":
    //   searchByProduct(keyword, res);
    //   break;
    case "products":
      searchProductByCategory(keyword, res);
      break;
    default:
      res.status(500).json({
        msg: "Bad request",
      });
      break;
  }
};

module.exports = {
  search,
};
