import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import serviceRoutes from "./routes/service.js";
import categoryRoutes from "./routes/category.js";
import structreRoutes from "./routes/structre.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB");
    })
    .catch(err => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/structre", structreRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800 || process.env.PORT, () => {
  connect();
  console.log("connected to Server");
});
