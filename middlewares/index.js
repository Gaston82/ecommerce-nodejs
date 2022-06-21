const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");
const validateFile = require("../middlewares/validate-file");

module.exports = {
  ...validateRole,
  ...validateFields,
  ...validateJWT,
  ...validateFile,
};
