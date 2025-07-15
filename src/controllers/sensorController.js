const SensorData = require("../models/SensorData");

const getAllData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const postData = async (req, res) => {
  try {
    const { ph, temperature, amonia, tds } = req.body;
    const newData = await SensorData.create({ ph, temperature, amonia, tds });
    console.log(newData);

    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllData,
  postData,
};
