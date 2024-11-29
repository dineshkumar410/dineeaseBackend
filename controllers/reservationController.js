const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");

// Create a reservation
exports.createReservation = async (req, res) => {
  try {
    const { restaurantId, date, time, partySize } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const reservation = new Reservation({
      user: req.user.id,
      restaurant: restaurantId,
      date,
      time,
      partySize,
    });

    await reservation.save();
    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get reservations for a user
exports.getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user.id,
    })
      .populate("restaurant")
      .populate("user", "name");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("restaurant", "name")
      .populate("user", "name");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    Object.assign(reservation, req.body);

    await reservation.save();
    res
      .status(200)
      .json({ message: "Reservation updated successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Cancel a reservation
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    await reservation.deleteOne();
    res.status(204).json({ message: "Reservation canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
