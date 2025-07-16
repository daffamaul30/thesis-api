const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  ph: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  amonia: {
    type: Number,
    required: true,
  },
  tds: {
    type: Number,
    required: true,
  },
  classification: {
    type: String,
    enum: ["Aman", "Waspada", "Berbahaya", "Belum diklasifikasi"],
    default: "Belum diklasifikasi",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SensorData", SensorSchema);
