const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// POST - Save reservation
router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ message: "Reservation saved successfully! ✅" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong ❌", error: err });
  }
});

// GET - Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong ❌" });
  }
});

module.exports = router;