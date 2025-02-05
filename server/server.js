const express = require("express");

const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const homeRoute = require("./routes/homeRoute");

const prisma = new PrismaClient();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://recipe-app-frontend.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH",
};

app.use(cors(corsOptions));
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
