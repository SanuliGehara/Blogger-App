import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

// create api routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
