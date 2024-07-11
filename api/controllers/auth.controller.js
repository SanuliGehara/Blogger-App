import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // checking if all inputs are given & not empty
  if (
    !username ||
    !password ||
    !email === "" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hashing the password
  const hashedPassword = await bcryptjs.hashSync(password, 10);

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
    res.status(500).json({ message: error.message });
  }
};
