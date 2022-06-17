const { Router } = require("express");
const { check } = require("express-validator");
const { userPost } = require("../controllers/users");
const { checkEmailExist } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("email").custom(checkEmailExist),
    check("password", "Password needs al least 6 characters").isLength({
      min: 6,
    }),
    check("role", "Invalid role type").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validateFields,
  ],
  userPost
);
module.exports = router;
