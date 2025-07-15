require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../src/config/dbConfig");
const sensorRoutes = require("../src/routes/sensorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Body:", req.body);
  }
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("Query:", req.query);
  }
  if (req.params && Object.keys(req.params).length > 0) {
    console.log("Params:", req.params);
  }

  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
    console.log();
  });

  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Node API (Custom Server)");
});

app.use("/api/sensor", sensorRoutes);

// Hanya untuk lokal, tapi tetap bisa dideploy ke Vercel
if (process.env.NODE_ENV !== "production") {
  connectDB(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  });
} else {
  connectDB(); // agar tetap connect saat deploy di Vercel
}

module.exports = app;
