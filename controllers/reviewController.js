const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");

// Post a review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment, photos } = req.body;

    const review = new Review({
      user: req.user.id,
      restaurant: req.params.restaurantId,
      rating,
      comment,
      photos,
    });

    await review.save();
    res.status(201).json({ message: "Review posted successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get reviews for a restaurant
exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({
      restaurant: req.params.restaurantId,
    })
      .populate("user", "name")
      .populate("restaurant", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews (For Admin dashboard)
exports.getAllreviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("restaurant", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a review (Can be edited only by the user that commented it)
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to update this review" });

    Object.assign(review, req.body);

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });

    await review.deleteOne();
    res.status(204).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
