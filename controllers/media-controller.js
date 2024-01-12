//const Media = require("../Models/Media");
const Media = require("../models/MediaSchema");

exports.getAll = async (req, res) => {
  try {
    
    const media = await Media.find();

    res.json(media);
    //console.log(media);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
};
// Backendurl/public/videos/file_name.mp4
exports.create = async (req, res) => {
  console.log(req.files);
  const { name } = req.body;
  
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    
     for (let video of req.files.videos) {
      videosPaths.push("/public/" + video.filename);
      //console.log(req.files);
     }
  }

  try {
    const createdMedia = await Media.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
};