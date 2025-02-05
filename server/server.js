const express = require("express");

const passport = require("passport");
const { PrismaClient } = require("@prisma/client");

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const homeRoute = require("./routes/homeRoute");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/", homeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
