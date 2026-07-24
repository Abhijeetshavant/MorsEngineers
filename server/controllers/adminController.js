import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: { username },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify token endpoint
export const verifyToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: req.admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
