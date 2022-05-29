const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      products: "/api/products",
      usuarios: "/api/usuarios",
    };
    this.middlewares();

    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectuta y parseo del body
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.products, require("../routes/products"));
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
