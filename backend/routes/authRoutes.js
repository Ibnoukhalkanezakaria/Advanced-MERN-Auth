import express from "express";

import {
  sighup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/check-auth", verifyToken);

router.post("/signup", sighup);
router.post("/login", login);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);

router.post("/reset-password/:token", resetPassword);

export default router;
