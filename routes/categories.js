const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categories");

const { existeCategoriaPorId } = require("../helpers/db-validators");
const router = Router();

//Crear categoría  - ruta privada - Cualquier persona con un token válido
router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  crearCategoria
);

//Obtener todas las categorías - ruta pública
router.get("/", obtenerCategorias);

//Obtener una categoría por id - ruta pública
router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validateFields,
  ],
  obtenerCategoria
);

//Actualizar categoría  - ruta privada - Cualquier persona con un token válido
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validateFields,
  ],
  actualizarCategoria
);

//Borrar unacategoría  - ruta privada - Admin
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validateFields,
  ],
  borrarCategoria
);

module.exports = router;
