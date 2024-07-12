import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // checking if all inputs are given & not empty
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    (email === "") | (password === "")
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(errorHandler(400, "User already exists with this email"));
  }

  // Hashing the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  // Save to DB
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};
