const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { createJWT } = require("../helpers/create-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User/password incorrect",
      });
    }

    //Verificar status

    if (!user.status) {
      return res.status(400).json({
        msg: "Your account has been deleted",
      });
    }

    //Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "User/password incorrect",
      });
    }

    //Generar jwt

    const token = await createJWT(user.id);

    // res.json({
    //   user,
    //   token,
    // });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        expires: new Date(
          new Date(new Date().setDate(new Date().getDate() + 7))
        ),
      })
      .json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
