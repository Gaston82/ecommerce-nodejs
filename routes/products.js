const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

const {
  existeCategoriaPorId,
  findProductById,
} = require("../helpers/db-validators");
const { validateJWT, isAdminRole, validateFields } = require("../middlewares");
const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("title", "Title is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    // check("category").custom(existeCategoriaPorId),
    check("description", "Description is required").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

router.get(
  "/:id",
  [
    check("id", "Invalid id").isMongoId(),
    check("id").custom(findProductById),
    validateFields,
  ],
  getProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(findProductById),
    validateFields,
  ],
  deleteProduct
);
router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(findProductById),
    validateFields,
  ],
  updateProduct
);

module.exports = router;
