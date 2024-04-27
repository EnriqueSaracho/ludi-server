// Importing modules.
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Importing UserModel
import { UserModel } from "../models/Users.js";

// Creating router
const router = express.Router();

// API for registering a user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // If user already exists
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  // If user doesn't exist
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });
  await newUser.save();

  res.json({ message: "New user registered successfully" });
});

// API for loging in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // If user doesn't exist
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    return res.json({ message: "Username or password is incorrect" });
  }

  // If password is incorrect
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" });
  }

  // Creating web token
  const token = jwt.sign({ id: user._id }, "secret"); // TODO: Change "secret" for environmental variable
  res.json({ token, userID: user._id });
});

// Exporting router
export { router as userRouter };
