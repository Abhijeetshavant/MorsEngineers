import express from "express";
import { adminLogin, verifyToken } from "../controllers/adminController.js";
import { verifyToken as authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/verify", authMiddleware, verifyToken);

export default router;
