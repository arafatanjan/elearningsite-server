const PlayCountController = require("../models/MediaPlayCountSchema.js");

exports.getPlayCount = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Corrected syntax for the find method
    const result = await PlayCountController.find();

    res.json(result);
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};