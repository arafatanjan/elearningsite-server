const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNum: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
    examResult: [
        {
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            marksObtained: {
                type: Number,
                default: 0
            },
            
            marksProgress: {
                type: Number,
                default: 0
            },
            QuizAvg: {
                type: Number,
                default: 0
            }
            
        }
    ],
    // mediaCount: [
    //     {
    //         playCount: {
    //             type: Number, 
    //             default: 0
    //            },
            
    //         totalCount: {
    //             type: Number, 
    //             default: 0
    //            },

    //     }
    // ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        }
    }]
});

// Add a virtual property to automatically populate subName in examResult
studentSchema.virtual('examResult.subNameRef', {
    ref: 'subject',
    localField: 'examResult.subName',
    foreignField: '_id',
    justOne: true,
});

// Apply the virtual property when querying the student model
studentSchema.pre('find', function() {
    this.populate('examResult.subNameRef');
});

module.exports = mongoose.model("student", studentSchema);