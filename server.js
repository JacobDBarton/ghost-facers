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
const HauntedLocSchema = new mongoose.Schema({
  image: String,
  description: String,
  city: String,
  state: String,
  location: String,
  hauntedRating: String,
});

const Haunted = mongoose.model("Haunted", HauntedLocSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////

app.get("/", (req, res) => {
  res.send("Hi GIGI");
});

// INDEX ROUTE
app.get("/ShowPage", async (req, res) => {
  try {
    res.json(await Haunted.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/CreateListPage", async (req, res) => {
  try {
    res.json(await Haunted.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE ROUTE
app.put("/EditListPage/:id", async (req, res) => {
  try {
    res.json(await Haunted.findByIdAndUpdate(req.params.id, req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE ROUTE
app.delete("/ShowPage/:id", async (req, res) => {
  try {
    res.json(await Haunted.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
