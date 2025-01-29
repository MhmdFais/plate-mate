const express = require("express");
const { login } = require("../controllers/authController");

const loginRoute = express.Router();

loginRoute.post("/", login);

module.exports = loginRoute;
