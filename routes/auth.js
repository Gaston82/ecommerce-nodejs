const { Router } = require("express");
const passport = require("passport-google-oauth20");
const login = require("../controllers/auth");
const router = Router();

router.post("/login", login);

module.exports = router;
