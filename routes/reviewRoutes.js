const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewsByRestaurant,
  updateReview,
  deleteReview,
  getAllreviews,
} = require("../controllers/reviewController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

// Post a review
router.post("/:restaurantId", authMiddleware, createReview);

// Get reviews for a restaurant
router.get("/:restaurantId", getReviewsByRestaurant);

// Get all reviews (Only Admin can access)
router.get("/", authMiddleware, adminMiddleware, getAllreviews);

// Update a review
router.patch("/:reviewId", authMiddleware, updateReview);

// Delete a review
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
