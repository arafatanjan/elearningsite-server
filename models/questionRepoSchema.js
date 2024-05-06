const mongoose = require("mongoose");

const QuestionRepoSchema = new mongoose.Schema({
    name: {
      type: String,
      },
    
    course: {
      type: String
    },

    category: {
      type: String
    },
    
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
    },
    
    pdfs: [{ type: String }],
},
  {
    timestamps: true,
  }
);

module.exports =  mongoose.model("QuestionRepo", QuestionRepoSchema);