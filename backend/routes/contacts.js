const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST - Save contact message
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message sent successfully! ✅" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong ❌", error: err });
  }
});

// GET - Get all messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong ❌" });
  }
});

module.exports = router;