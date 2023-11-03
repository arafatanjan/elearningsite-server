const mongoose=require('mongoose');
const { Schema } = mongoose;

// /** question model */
const questionModel = new Schema({
    question: { type : Array, default: []}, // create question with [] default value
    answer : { type : Array, default: []},
    createdAt: { type: Date, default: Date.now },
});

module.exports= mongoose.model('Question', questionModel);
// module.exports.Questions= mongoose.model('Question', questionModel);