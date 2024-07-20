import express from "express";
import { create, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create post api
router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
export default router;
