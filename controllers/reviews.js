const express = require("express");
const { Reviews } = require('../models');
const router = express.Router();

// for user reviews and ratings
router.get("/:locationId", async (req, res) => {
  try {
    res.json(await Reviews.findOne({ location: req.params.locationId }));
  } catch (error) {
    res.status(400).json(error);
  }
});

// for user reviews and ratings
router.post("/:locationId", async (req, res) => {
  try {
    await Reviews.updateOne(
      {
        location: req.params.locationId, // assign the _id from the location
      },
      {
        comment: req.body.comment,
        hauntedRating: req.body.hauntedRating,
        location: req.params.locationId, // assign the _id from the location
      },
      {
        upsert: true,
      }
    );
    // review update is successful
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete route
router.delete("/:locationId", async (req, res) => {
  try {
    res.json(
      await Reviews.findOneAndDelete({
        location: req.params.locationId, 
      })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
