const User = require("../models/user");
const Role = require("../models/role");
const { Categorie, Product } = require("../models");

const checkRole = async (role = "") => {
  const doesRoleExist = await Role.findOne({ role });
  if (!doesRoleExist) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categorie.findById(id);
  if (!existeCategoria) {
    throw new Error(`La categoría con id : ${id} no existe`);
  }
};
const findProductById = async (id) => {
  const doesProductExist = await Product.findById(id);
  if (!doesProductExist) {
    throw new Error(`We dont have any product with the id : ${id} `);
  }
};
const findUserById = async (id) => {
  const doesUserExist = await User.findById(id);
  if (!doesUserExist) {
    throw new Error(`We dont have any user with the id : ${id} `);
  }
};

const checkEmailExist = async (email = "") => {
  const doesEmailExist = await User.findOne({ email });
  if (doesEmailExist) {
    throw new Error(`The email adress ${email} already exist`);
  }
};

module.exports = {
  checkEmailExist,
  checkRole,
  existeCategoriaPorId,
  findProductById,
  findUserById,
};
