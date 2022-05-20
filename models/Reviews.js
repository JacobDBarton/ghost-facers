const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  comment: String,
  hauntedRating: Number,
  location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
});

const Reviews = mongoose.model("reviews", reviewsSchema);

module.exports = Reviews;
