const express = require("express");
const { getAllData, postData, getLatestData } = require("../controllers/sensorController");

const router = express.Router();

router.get("/", getAllData);
router.get("/latest", getLatestData);
router.get("/:hours", getAllData);
router.post("/", postData);

module.exports = router;
