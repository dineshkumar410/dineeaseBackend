const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Get user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile
router.patch("/profile", authMiddleware, updateUserProfile);

module.exports = router;
