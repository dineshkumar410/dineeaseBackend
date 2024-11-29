const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Canceled"],
      default: "Pending",
    },
    razorpayOrderId: { type: String }, // Razorpay order ID
    paymentId: { type: String }, // Razorpay payment ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
