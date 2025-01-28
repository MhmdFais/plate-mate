require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const existinguser = await prisma.user.findUnique({
      email: req.body.email,
    });

    if (existinguser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!user || !checkPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateToken = (user) => {
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ error: "Access denied, token missing!" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN);

    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
        userId: payload.id,
      },
    });

    if (!storedToken) {
      return res.status(403).json({ error: "Token not valid" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);

    await prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        token: newRefreshToken,
      },
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ error: "Access denied, token missing!" });
  }

  try {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, login, refreshToken, logout };
