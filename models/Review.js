const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant ID is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      minlength: [10, "Comment must be at least 10 characters long"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    photos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook (if needed for custom logic, such as cleaning up URLs)
reviewSchema.pre("save", function (next) {
  // Example: Trim comments to remove unnecessary whitespace
  if (this.comment) {
    this.comment = this.comment.trim();
  }
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
