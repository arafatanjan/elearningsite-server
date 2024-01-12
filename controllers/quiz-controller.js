
const  {question, answer} = require('./data.js');
// const  question = require('../database/data.js');

const Questions= require('../models/questionSchema.js');
const Result= require('../models/resultSchema.js');

/** get all questions */
// module.exports.getQuestions= (req, res) =>{
//       res.send("Get Requesttt");
    
   
//  }

module.exports.getQuestions=async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q);
        // console.log(question);
    } catch (error) {
        res.json({ error })
    }
}

// module.exports=getQuestions;

 /** insert all questinos */
//  module.exports.insertQuestions= (req, res) =>{
//     res.json("Question api post request");
  
 
// }

module.exports.insertQuestions= async function insertQuestions(req, res){
    try {
    //    console.log("Post Api");
       console.log(req.body);
    //    res.send("Res Post Api");
    //    console.log(question);
    const { question, answer, properties } = req.body;
      
    const insertedQuestions = await Questions.insertMany({properties,question ,answer});

    // Log the inserted questions (you may want to handle this data differently)
    console.log('Inserted Questions:', insertedQuestions);

    // Respond with success message or appropriate response
    res.json({ message: 'Questions inserted successfully' });
    }
    catch (error) {
        // Handle any errors that occur during the insertion process
        console.error('Error inserting questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

// module.exports.insertQuestions=async function insertQuestions(req, res) {
//     try {
//       // Assuming req.body contains the questions and answers you want to insert
//       const { question, answer } = require('../database/data.js');
  
//       // Create an array of objects with question and answer properties
//       const questionAnswerPairs = question?.map((question, index) => ({
//         question,
//         answer: answer[index] || '' // Assuming answers may not be provided for all questions
//       }));
  
//       // Insert the question-answer pairs into the database
//       await Questions.insertMany(questionAnswerPairs);
  
//       res.json({ msg: "Data Saved Successfully!" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
  
  
/** Delete all Questions */
 module.exports.dropQuestions= async function dropQuestions(req, res){
    try {
         await Questions.deleteMany();
         res.json({ msg: "Questions Deleted Successfully...!"});
    } catch (error) {
         res.json({ error })
    }
 }

/** get all result */

module.exports.getResult= async function getResult(req, res){
    try {
        const r = await Result.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}
/** post all result */
// module.exports.storeResult= function storeResult(req, res){
//     try {
//          const { username, result, attempts, points, achived } = req.body;
//         //  if(!username && !result) throw new Error('Data Not Provided...!');
//          if(!result) throw new Error('Data Not Provided...!');
 
//          Result.create().then({ username, result, attempts, points, achived }, function(err, data){
//              res.json({ msg : "Result Saved Successfully...!"})
//          })
 
//     } catch (error) {
//          res.json({error})
//     }
//  }

// const Result = require('../models/result'); // Assuming you have a Result model

module.exports.storeResult=async function storeResult(req, res) {
  try {
    const {property, username, result, attempts, points, achieved } = req.body;

    // Check if result is provided
    if (!result) {
      throw new Error('Result data not provided.');
    }

    // Create an object with the data to be saved
    const resultData = {
      property,
      username,
      result,
      attempts,
      points,
      achieved
    };

    // Insert the result data into the database
    const savedResult = await Result.create(resultData);

    res.json({ msg: 'Result saved successfully.', savedResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





/** delete all result */

module.exports.dropResult= async function dropResult(req, res){
    try {
        await Result.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}