const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

// Get all restaurants
router.get("/", getAllRestaurants);

// Get restaurant by ID
router.get("/:id", getRestaurantById);

// Create a new restaurant (Admin only)
router.post("/", authMiddleware, adminMiddleware, createRestaurant);

// Update a restaurant (Admin only)
router.patch("/:id", authMiddleware, adminMiddleware, updateRestaurant);

// Delete a restaurant (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteRestaurant);

module.exports = router;
