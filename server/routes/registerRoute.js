const express = require("express");
const { registerUser } = require("../controllers/authController");

const registerRoute = express.Router();

registerRoute.post("/", registerUser);

module.exports = registerRoute;
