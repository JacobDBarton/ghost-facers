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
////////////////////////////////
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

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////

// app.get("/", (req, res) => {
//   res.send("Hi GIGI");
// });

// INDEX ROUTE
app.get("/locations/featured", async (req, res) => {
  try {
    res.json(await Locations.find({ image: { $exists: true } }));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/locations/all", async (req, res) => {
  try {
    res.json(await Locations.find());
  } catch (error) {
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
