const dbValidator = require("./db-validators");
const createJWT = require("./create-jwt");
const uploadFile = require("./upload-file");

module.exports = {
  ...dbValidator,
  ...createJWT,
  ...uploadFile,
};
