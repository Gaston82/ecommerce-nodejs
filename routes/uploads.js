const { Router } = require("express");
const { check } = require("express-validator");
const {
  uploadFiles,
  updateImage,
  showImage,
  updateImageCloudinary,
} = require("../controllers/uploads");
const { validCollections } = require("../helpers");

const { validateFields, validateFile } = require("../middlewares");
const router = Router();

router.post("/", validateFile, uploadFiles);
router.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "It should be a mongo is").isMongoId(),
    check("collection").custom((c) =>
      validCollections(c, ["users", "products"])
    ),
    validateFields,
  ],

  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "It should be a mongo is").isMongoId(),
    check("collection").custom((c) =>
      validCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
