import express from "express";
import {
  deleteUser,
  signout,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.post("/signout", signout);
export default userRouter;
