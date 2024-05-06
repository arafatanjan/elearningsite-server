const mongoose = require('mongoose');

const finalstudentSchema = new mongoose.Schema({

    Student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },

    name: {
        type: String,      
    },
    
    rollNum: {
        type: Number,
        
    },
    
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    teachSubject_id : {
        type: String,
        
    },
    teachSubject_subName : {
        type: String,
        
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
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
            examNewMarks: { 
                type: Number, 
                default: 0 },
            
            marksProgress: {
                type: Number,
                default: 0
            },
            progressNewMarks: { 
                type: Number, 
                default: 0 
            },
            QuizAvg: {
                type: Number,
                default: 0
            },
            quizNewMarks: { 
                type: Number, 
                default: 0
             }
            
        }
    ],
    
    attendancePercentage : {
        type: Number,
        
    },
    attendanceNewMarks: { 
        type: Number
     }
},
{ timestamps: true });

module.exports = mongoose.model("finalstudent", finalstudentSchema);