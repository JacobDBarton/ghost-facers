const express = require("express");
const { Locations } = require('../models');
const router = express.Router();

// for the carousel
router.get("/featured", async (req, res) => {
  try {
    res.json(await Locations.find({ image: { $exists: true } }));
  } catch (error) {
    res.status(400).json(error);
  }
});

// for the search bar
router.get("/search", async (req, res) => {
  try {
    res.json(
      await Locations.find({
        city: { $regex: req.query.query, $options: "i" },
      }).limit(20)
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// for a single location
router.get("/:id", async (req, res) => {
  try {
    res.json(await Locations.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
