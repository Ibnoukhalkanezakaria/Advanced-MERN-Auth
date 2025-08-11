import express from "express";
import { connectDb } from "./database/connectDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // this will parse JSON bodies
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to the backend server!");
// });

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening on port ${PORT}`);
});

// 1:04:00
// f3e5ed7b77a0eca355a5a51283818495
