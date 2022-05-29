const { Router } = require("express");
const {
  getProducts,
  deleteProducts,
  postProducts,
  updateProducts,
} = require("../controllers/products");
const router = Router();

router.get("/", getProducts);
router.post("/", postProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

module.exports = router;
