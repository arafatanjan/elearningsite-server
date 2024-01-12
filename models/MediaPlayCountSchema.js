const mongoose = require("mongoose");

const MediaPlayCountSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
    },
    videoId: [{ type: String }],
    playCount: [{ type: Number }],
  },
  
  {
    timestamps: true,
  }
);

module.exports = MediaPlayCount = mongoose.model("MediaPlayCount", MediaPlayCountSchema);