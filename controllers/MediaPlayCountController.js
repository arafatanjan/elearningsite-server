const MediaPlayCountController = require("../models/MediaSchema");

exports.getAll = async (req, res) => {
  try {
    
    const { videoId, playCount, studentName } = req.body;
  
  // Do something with the received data (e.g., update a database)
  console.log(`Received play count update for video ${videoId}: ${playCount}`);

  res.json({ success: true });
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
};