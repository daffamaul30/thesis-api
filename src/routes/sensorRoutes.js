const express = require("express");
const { getAllData, postData } = require("../controllers/sensorController");

const router = express.Router();

router.get("/", getAllData);
router.post("/", postData);

module.exports = router;
