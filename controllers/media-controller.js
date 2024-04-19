//const Media = require("../Models/Media");
const Media = require("../models/MediaSchema");
//const ftp = require('basic-ftp');

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
  const { name, semester, year, course, category } = req.body;
  
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    
     for (let video of req.files.videos) {
      videosPaths.push("/public/" + video.filename);
      //console.log(req.files);
     }
  }
  //const client = new ftp.Client();
  try {

    // await client.access({
    //   host: '203.76.98.229',
    //   user: 'elms',
    //   password: 'Nothing69',
    //   secure: false, // Set to true if FTP server supports FTPS
    // });

    // // Upload each video file to the FTP server
    // for (let videoPath of videosPaths) {
    //   await client.uploadFrom(videoPath, path.basename(videoPath));
    // }

    // res.status(200).send('File uploaded successfully');

    const createdMedia = await Media.create({
      name,
      course, 
      category,
      videos: videosPaths,
    });

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
  // finally {
  //   client.close();
  // }
};