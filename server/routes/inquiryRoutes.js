import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  getInquiryById,
} from "../controllers/inquiryController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public route
router.post("/", createInquiry);

// Admin routes
router.get("/admin", verifyToken, getInquiries);
router.get("/admin/:id", verifyToken, getInquiryById);
router.put("/admin/:id", verifyToken, updateInquiryStatus);

export default router;
