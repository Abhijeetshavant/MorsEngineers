import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getFeaturedProducts,
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// Admin routes - Note: 'admin' in the path for consistency
router.post("/admin", verifyToken, upload.single("image"), createProduct);
router.put("/admin/:id", verifyToken, upload.single("image"), updateProduct);
router.delete("/admin/:id", verifyToken, deleteProduct);

export default router;
