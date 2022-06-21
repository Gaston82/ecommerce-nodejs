const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { uploadFile } = require("../helpers");

const { User, Product } = require("../models");

const uploadFiles = async (req, res = response) => {
  try {
    //txt,md
    // const name = await uploadFile(req.files, ["txt", "md"], "text");
    const name = await uploadFile(req.files, undefined, "imgs");
    res.json({
      name,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} not founded`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} not founded`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Internal error" });
  }

  if (model.img) {
    const imagePath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json(model);
};
const updateImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} not founded`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} not founded`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Internal error" });
  }

  if (model.img) {
    const imagesCollection = model.img.split("/");
    const name = imagesCollection[imagesCollection.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;

  await model.save();

  res.json(model);
};

const showImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `User with id ${id} not founded`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `Product with id ${id} not founded`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Internal error" });
  }

  if (model.img) {
    const imagePath = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }

  const imagePath = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(imagePath);
};

module.exports = {
  uploadFiles,
  updateImage,
  showImage,
  updateImageCloudinary,
};
