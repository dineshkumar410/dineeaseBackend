const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const Reservation = require("../models/Reservation");

// Manage restaurant updations
exports.manageRestaurantListings = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    Object.assign(restaurant, update);
    await restaurant.save();

    res.status(200).json({ message: "Restaurant listing updated", restaurant });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Deleting a review as Admin
exports.manageReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();

    res.status(204).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Deleting a reservation as Admin
exports.manageReservations = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    await reservation.deleteOne();

    res.status(204).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
