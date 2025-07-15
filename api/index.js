require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../src/config/dbConfig");

const sensorRoutes = require("../src/routes/sensorRoutes.js");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

connectDB(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log(req.body);
  }
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("query:", req.query);
  }
  if (req.params && Object.keys(req.params).length > 0) {
    console.log("params:", req.params);
  }

  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
    console.log();
  });

  next();
});

app.use(express.json());

app.use("/api/sensor", sensorRoutes);

module.exports = app;
