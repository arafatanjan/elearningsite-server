// const MediaPlayCountController = require("../models/MediaPlayCountSchema.js");

// exports.getAll = async (req, res) => {
//   const { videoId, playCount, studentName, totalCount } = req.body;

//   try {
//     // Assuming MediaPlayCountController is a Mongoose model
//     const media = await MediaPlayCountController.findOne({ student_id: req.params.id });

// if (!media) {
//   // Create a new media entry if not found
//   const playCountEntry = new MediaPlayCountController({
//     playCounts: [{ videoId, playCount, studentName, totalCount }],
//   });
// console.log('log from if block')
//   // Save the play count entry to the database
//   await playCountEntry.save();
// } else {
//       // Update an existing entry
//       const existingMedia = media.playCounts.find(
//         (result) => result.studentName.toString() === studentName
//       );

//       if (existingMedia) {
//         existingMedia.playCount = playCount;
//         existingMedia.totalCount = totalCount;
//       } else {
//         // Add a new play count entry if the student is not found
//         media.playCounts.push({ videoId, playCount, studentName, totalCount });
//       }
//       console.log('log from else if block')
//       // Save the updated media entry to the database
//       await media.save();
//     }

//     console.log(`Received play count update for video ${videoId}: ${playCount}`);
//     res.json({ success: true });
//   } 
//   catch (error) {
//     console.error("Error handling play count update:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

const MediaPlayCountController = require("../models/MediaPlayCountSchema.js");

exports.updatePlayCount = async (req, res) => {
  try {
    const { videoId, playCount, totalCount } = req.body;
    const studentId = req.params.id;

    // Check if there is an existing document with the provided student_id
    const existingDocument = await MediaPlayCountController.findOne({ student_id: studentId });

    if (existingDocument) {
      // If an existing document is found, check if new playCount is greater
      if (playCount > existingDocument.playCount) {
        // If new playCount is greater, update playCount and totalCount
        existingDocument.playCount = playCount;
        existingDocument.totalCount = totalCount;
        await existingDocument.save();
      }
    } else {
      // If no existing document is found, create a new one
      await MediaPlayCountController.create({
        student_id: studentId,
        playCount: playCount,
        totalCount: totalCount,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating media play count:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};






