const { response } = require("express");
// const categoria = require("../models/categoria");
const { Categorie } = require("../models");

//obtenerCategorías - paginado - populate

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };
  const [total, categories] = await Promise.all([
    Categorie.countDocuments(query),
    Categorie.find(query)
      .populate("user", "name")
      .limit(Number(limite))
      .skip(Number(desde)),
  ]);

  res.json({
    categories,
    total,
  });
};
//obtenerCategoría - populate {}

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const category = await Categorie.findById(id).populate("user", "name");

  res.json(category);
};

const crearCategoria = async (req, res = response) => {
  //Guarda el nombre de la categoría en mayúsculas
  const name = req.body.name.toUpperCase();

  const categoryDB = await Categorie.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Categorie(data);

  //Guardar DB

  await category.save();

  res.status(201).json(category);
};

// actualizarCategiría

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Categorie.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

// borrarCategoría - estado: false

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoriaBorrada = await Categorie.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  // console.log("categoriaBorrada");
  res.json(categoriaBorrada);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
