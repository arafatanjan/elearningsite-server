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
},{
    toJSON: { virtuals: true },
        toObject: { virtuals: true }
});

complainSchema.virtual('students', {
     ref: 'student',
     localField: 'user',
     foreignField: '_id',
     justOne: true
   });

module.exports = mongoose.model("complain", complainSchema);