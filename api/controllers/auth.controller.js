import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  //Check if fields are empty
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find if the user is valid (exists)
    const validUser = await User.findOne({ email });

    // Error display for wrong email
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if password is valid
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // Error display for wrong password
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    // IF SIGNIN WAS SUCUSSFULL
    // Create a token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    // skip sending the password as response
    const { password: pass, ...rest } = validUser._doc;

    // Create a cookie
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (user) {
      //create a token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      // Create random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      //Save user in DB
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
