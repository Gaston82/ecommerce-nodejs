const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");
const passport = require("passport-google-oauth20");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      auth: "/api/auth",
      cart: "/api/cart",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      users: "/api/users",
      uploads: "/api/uploads",
    };

    // this.app.passport();

    this.connectDB();

    this.middlewares();

    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectuta y parseo del body
    this.app.use(express.json());
    this.app.use(cookie());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.cart, require("../routes/cart"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.users, require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
