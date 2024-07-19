import express from "express";
import { create } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create post api
router.post("/create", verifyToken, create);

export default router;
