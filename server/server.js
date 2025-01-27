const express = require("express");
const app = express();

const passport = require("passport");

const loginRoute = require("./routes/loginRoute");
const registerRouter = require("./routes/registerRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
