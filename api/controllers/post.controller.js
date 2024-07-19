import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  // Check if user is not admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not alllowed to create a post"));
  }

  // Ckeck all fileds are filled before creating post
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");

  const newPost = new Post({ ...req.body, slug, userId: req.user.id });

  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};
