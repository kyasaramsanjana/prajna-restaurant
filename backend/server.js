const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const reservationRoutes = require("./routes/reservations");
const contactRoutes = require("./routes/contacts");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Routes
app.use("/api/reservations", reservationRoutes);
app.use("/api/contacts", contactRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));