const { Router } = require("express");
const {
  addToCart,
  getProductsFromCart,
  removeProductFromCart,
} = require("../controllers/cart");
const { check } = require("express-validator");
const { findProductById, findUserById } = require("../helpers/db-validators");
const { validateJWT, validateFields } = require("../middlewares");

const router = Router();

router.post(
  "/:uid",
  [
    check("uid", "Invalid id").isMongoId(),
    check("uid").custom(findUserById),
    validateFields,
  ],
  addToCart
);
router.get("/:uid", [validateJWT, validateFields], getProductsFromCart);
router.delete(
  "/:uid",
  [validateJWT, findProductById, validateFields],
  removeProductFromCart
);

module.exports = router;
