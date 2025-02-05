const express = require("express");
const { getRandomRecipe } = require("../controllers/homeController");

const homeRoute = express.Router();

homeRoute.get("/", getRandomRecipe);

module.exports = homeRoute;
