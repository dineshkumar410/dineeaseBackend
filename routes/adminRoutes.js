const express = require("express");
const router = express.Router();
const {
  manageRestaurantListings,
  manageReviews,
  manageReservations,
} = require("../controllers/adminController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

// Manage restaurant listings (Admin can create a new restaurant or edit existing restaurants)
router.patch(
  "/restaurants/:id",
  authMiddleware,
  adminMiddleware,
  manageRestaurantListings
);

// Manage reviews (Admin able to delete reviews in dashboard)
router.delete("/reviews/:id", authMiddleware, adminMiddleware, manageReviews);

// Manage reservations (Admin able to delete reservations in dashboard)
router.delete(
  "/reservations/:id",
  authMiddleware,
  adminMiddleware,
  manageReservations
);

module.exports = router;
