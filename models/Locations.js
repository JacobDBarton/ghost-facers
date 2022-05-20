const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  image: String,
  description: String,
  city: String,
  state: String,
  location: String,
  hauntedRating: String,
});

const Locations = mongoose.model("locations", locationsSchema);

module.exports = Locations;
