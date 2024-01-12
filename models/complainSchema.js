const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true,
    }
});

complainSchema.virtual('students', {
     ref: 'student',
     localField: 'user',
     foreignField: 'student_id',
     justOne: true
   });

module.exports = mongoose.model("complain", complainSchema);