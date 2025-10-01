const SensorData = require("../models/SensorData");

const getAllData = async (req, res) => {
  try {
    const { hours } = req.params;
    let filter = {};

    if (hours) {
      const parsedHours = parseFloat(hours); // <-- ubah ke float
      if (!isNaN(parsedHours)) {
        // cari data terbaru
        const latestData = await SensorData.findOne().sort({ timestamp: -1 });

        if (latestData) {
          const startTime = new Date(
            latestData.timestamp.getTime() - parsedHours * 60 * 60 * 1000
          );
          filter = { timestamp: { $gte: startTime } };
        }
      }
    }

    const data = await SensorData.find(filter).sort({ timestamp: -1 });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getLatestData = async (req, res) => {
  try {
    // cari 1 data terbaru berdasarkan timestamp
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });

    if (!latestData) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: latestData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const postData = async (req, res) => {
  try {
    const { ph, temperature, amonia, tds, classification } = req.body;
    const newData = await SensorData.create({
      ph,
      temperature,
      amonia,
      tds,
      classification,
    });
    console.log(newData);

    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllData,
  postData,
  getLatestData
};
