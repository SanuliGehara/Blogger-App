import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import exp from "constants";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MonogoDB is connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
