///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
///////////////////////////////

mongoose.connect(MONGODB_URL);

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////

const locationsSchema = new mongoose.Schema({
  image: String,
  description: String,
  city: String,
  state: String,
  location: String,
  hauntedRating: String,
});

const Locations = mongoose.model("locations", locationsSchema);

const reviewsSchema = new mongoose.Schema({
  comment: String,
  hauntedRating: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: "locations" },
});

const Reviews = mongoose.model("reviews", reviewsSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////

app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////

// INDEX ROUTE
// for the carousel
app.get("/locations/featured", async (req, res) => {
  try {
    res.json(await Locations.find({ image: { $exists: true } }));
  } catch (error) {
    res.status(400).json(error);
  }
});

// for the search bar
app.get("/locations/all", async (req, res) => {
  try {
    res.json(await Locations.find());
  } catch (error) {
    res.status(400).json(error);
  }
});

// for the search bar
app.get("/locations/search", async (req, res) => {
  try {
    console.log("req.query.query", req.query.query);
    res.json(
      await Locations.find({
        location: { $regex: req.query.query, $options: "i" },
      }).limit(20)
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// for a single location
app.get("/locations/:id", async (req, res) => {
  try {
    res.json(await Locations.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// for user reviews and ratings
app.get("/reviews", async (req, res) => {
  try {
    res.json(await Reviews.find().populate("location"));
  } catch (error) {
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
