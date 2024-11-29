const express = require("express");
const router = express.Router();
const {
  createReservation,
  getReservationsByUser,
  updateReservation,
  cancelReservation,
  getAllReservations,
} = require("../controllers/reservationController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

// Create a reservation
router.post("/", authMiddleware, createReservation);

// Get reservations for a user
router.get("/user", authMiddleware, getReservationsByUser);

// Get reservations for a restaurant (only admin can get all reservations)
router.get("/", authMiddleware, adminMiddleware, getAllReservations);

// Update reservation for a user
router.patch("/:id", authMiddleware, updateReservation);

// Cancel a reservation for a user
router.delete("/:id", authMiddleware, cancelReservation);

module.exports = router;
