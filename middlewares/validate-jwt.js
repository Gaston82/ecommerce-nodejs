const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    //Verificamos usuario null
    if (!user) {
      return res.status(401).json({
        msg: " Token no válido - USUARIO NO REGISTRADO EN LA bd",
      });
    }

    //Verificar si el uid tienen estado true
    if (!user.status) {
      return res.status(401).json({
        msg: " Token no válido - USUARIO NO REGISTRADO EN LA bd",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
