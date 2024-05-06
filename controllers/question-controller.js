
const QuestionRepo = require("../models/questionRepoSchema");

exports.getAll = async (req, res) => {
    try {
      
      const media = await QuestionRepo.find();
  
      res.json(media);
      //console.log(media);
    } catch (error) {
      //console.log(error);
      res.status(400).json(error);
    }
  };

exports.create = async (req, res) => {

  console.log(req.files);
  
  const { name, course, category, teachSubjectId } = req.body;

  let pdfPaths = [];

  if (Array.isArray(req.files.pdfs) && req.files.pdfs.length > 0) {
    
     for (let pdf of req.files.pdfs) {
      pdfPaths.push("/public/" + pdf.filename);
    
     }
  }
  
  try {

    const createdMedia = await QuestionRepo.create({
      name,
      course, 
      category,
      teacher_id: teachSubjectId,
      pdfs: pdfPaths,
    });

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
  
};

// const QuestionRepo = require("../models/questionRepoSchema");



//      exports.create = async (req, res) => {

//         console.log(req.body);
//         console.log(req.files);
        
        
//         try {
//             // Create a new question document based on the request body
//             const { name, course, category, teachSubjectId } = req.body;
//             const pdfUrl = req.body.pdf; // Assuming 'path' property of 'req.file' contains the file path
            
//             const newQuestion = new QuestionRepo({
//               name,
//               course,
//               category,
//               teachSubjectId,
//               questions:pdfUrl
//             });
              
        
//             // Save the question document to the database
//             const savedQuestion = await newQuestion.save();
        
//             res.json(savedQuestion); // Respond with the saved question document
//           } catch (error) {
//             console.error('Error occurred while uploading question:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//           }
        
//        };




// exports.create = async (req, res) => {

    //     console.log(req.files);
    //     const { name, course, category, teachSubjectId } = req.body;
    //     const pdfUrl = req.file.path; // Assuming 'path' property of 'req.file' contains the file path
      
    //     try {
    //       const createdQuestionRepo = await QuestionRepo.create({
    //           name,
    //           course, 
    //           category,
    //           teachSubjectId,
    //           questions : pdfUrl
        
    //         });
        
    //         res.json({ message: "Question created successfully", createdQuestionRepo });
          
    //     } catch (error) {
    //       //console.log(error);
    //       res.status(400).json(error);
    //     }
    //     // finally {
    //     //   client.close();
    //     // }
    //   };



    // exports.create = async (req, res) => {

    //     console.log(req.files);
    //     const { name, course, category, teachSubjectId } = req.body;
        
    //     let questionPaths = [];
      
    //     if (Array.isArray(req.files.pdf) && req.files.pdf > 0) {
          
    //        for (let question of req.files.questions) {
    //           questionPaths.push("/public/" + question.filename);
    //         //console.log(req.files);
    //        }
    //     }
    //     //const client = new ftp.Client();
    //     try {
      
    //       const createdQuestionRepo = await QuestionRepo.create({
    //         name,
    //         course, 
    //         category,
    //         teachSubjectId,
    //         questions: questionPaths
      
    //       });
      
    //       res.json({ message: "Question created successfully", createdQuestionRepo });
    //     } catch (error) {
    //       //console.log(error);
    //       res.status(400).json(error);
    //     }
        
    //   };