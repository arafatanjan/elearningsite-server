// const mongoose = require("mongoose");

// const MediaPlayCountSchema = new mongoose.Schema(
//   {
//     studentName: {
//       type: String,
//     },
//     videoId: { 
//       type: String 
//     },
//     playCount: {
//        type: Number, 
//        default: 0
//       },
//     totalCount: {
//        type: Number, 
//        default: 0
//       },
//   },
  
//   {
//     timestamps: true,
//   }
// );

// module.exports = MediaPlayCount = mongoose.model("MediaPlayCount", MediaPlayCountSchema);

const mongoose = require('mongoose');

const mediaPlayCountSchema = new mongoose.Schema({
  // videoId: { type: String, required: true },
  // studentName: { type: String, required: true },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
},
  playCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 },
});

// const mediaPlayCountSchema = new mongoose.Schema({
//   student_id: { type: mongoose.Schema.Types.ObjectId},
//   playCounts: [playCountSchema],
// });

const MediaPlayCountController = mongoose.model('MediaPlayCountController', mediaPlayCountSchema);

module.exports = MediaPlayCountController;
