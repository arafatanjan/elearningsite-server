const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    semester: {
      type: String 
    },
    year: {
      type: String 
    },
    course: {
      type: String
    },
    category: {
      type: String
    },
    videos: [{ type: String }],
    
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    },
      sclass_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
    },
},
  {
    timestamps: true,
  }
);

module.exports = Media = mongoose.model("Media", MediaSchema);