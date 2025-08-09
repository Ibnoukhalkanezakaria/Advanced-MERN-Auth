import express from "express";
import {
  sighup,
  login,
  logout,
  verifyEmail,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", sighup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/logout", logout);

export default router;
