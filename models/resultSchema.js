const mongoose=require('mongoose');
const { Schema } = mongoose;


/** result model */
const resultModel = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    property: { 
        type: Object, 
        default: {} 
    },
    username : { 
        type : String
     },
    result : { 
        type : Array, 
        default : []
    },
    attempts : { 
        type : Number, 
        default : 0
    },
    points : { 
        type : Number, 
        default : 0
    },
    achived : { 
        type : String, 
        default : ''
    },
    createdAt : { 
        type : Date, 
        default : Date.now
    }
})

module.exports= mongoose.model('result', resultModel);