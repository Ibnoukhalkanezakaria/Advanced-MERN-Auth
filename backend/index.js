import express from "express";
import { connectDb } from "./database/connectDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // this will parse JSON bodies

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening on port ${PORT}`);
});

// 1:04:00