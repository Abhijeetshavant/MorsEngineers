import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Body parser middleware - IMPORTANT: Must be before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiries", inquiryRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "MORS ENGINEERS API Server is running",
    endpoints: {
      products: "/api/products",
      admin: "/api/admin",
      inquiries: "/api/inquiries",
      health: "/api/health",
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler - Must be after all routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    requestedUrl: req.originalUrl,
  });
});

// ============================================
// VERCEL DEPLOYMENT - Export for Serverless
// ============================================
// For local development, run the server with app.listen()
// For Vercel, export the app as a serverless function

// Check if we're running on Vercel
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

if (!isVercel) {
  // Local development - Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  });
}

// Export for Vercel serverless deployment
export default app;
