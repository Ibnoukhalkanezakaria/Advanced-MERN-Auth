console.log("routes loaded");

import express from "express";
import { sighup, login, logout } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", sighup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
