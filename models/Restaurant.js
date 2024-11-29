const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    priceRange: {
      type: String,
      enum: ["$", "$$", "$$$", "$$$$"],
      required: true,
    },
    location: { type: String, required: true },
    address: { type: String },
    dietaryRestrictions: { type: [String], default: [] },
    ambiance: { type: String },
    specialFeatures: { type: [String], default: [] },
    menu: [{ type: String }], // URLs for menu images or descriptions
    photos: [{ type: String }], // URLs for restaurant photos
    contactDetails: {
      phone: { type: String },
      email: { type: String },
    },
    availability: [
      {
        date: { type: Date },
        timeSlots: [
          {
            time: { type: String },
            isAvailable: { type: Boolean, default: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
