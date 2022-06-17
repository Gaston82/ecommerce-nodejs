const { response } = require("express");
// const categoria = require("../models/categoria");
const { Product } = require("../models");

//obtenerCategorías - paginado - populate

const getProducts = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    products,
    total,
  });
};
//obtenerCategoría - populate {}

const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("user", "name");

  res.json(product);
};

const createProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body;

  const productDB = await Product.findOne({ title: body.title });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.title} ya existe`,
    });
  }

  const data = {
    ...body,
    user: req.user._id,
  };

  const product = new Product(data);

  //Guardar DB

  await product.save();

  res.status(201).json(product);
};

// actualizarCategiría

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

// borrarCategoría - estado: false

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const productToDelete = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  // console.log("categoriaBorrada");
  res.json(productToDelete);
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};
