const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const shortName = file.name.split(".");
    const extension = shortName[shortName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(`The extension ${extension} is not allowed `);
    }

    const temporaryName = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      temporaryName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(temporaryName);
    });
  });
};

module.exports = {
  uploadFile,
};
