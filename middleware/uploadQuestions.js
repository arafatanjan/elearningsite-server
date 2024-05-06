const express = require("express")
//const destpath= require("../public/")
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage= multer.diskStorage({
    destination: "./public",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' + file.originalname)
    }
  })

  const uploadQuestions = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      //console.log(req.files);
      
      if (ext !== ".pdf") {
        return cb(new Error("Only videos are allowed!"));
      }
  
      cb(null, true);
    },
  });

  module.exports= uploadQuestions;



// const express = require("express")
// //const destpath= require("../public/")
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });
  
//   const uploadQuestions = multer({ 
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//       var ext = path.extname(file.originalname);
//       if (ext !== ".pdf") {
//         return cb(new Error("Only PDFs are allowed!"));
//       }
//       cb(null, true);
//     }
//   });

//   module.exports= uploadQuestions;




// const storage= multer.diskStorage({
//     destination: "./upload",
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, uniqueSuffix+ '-' + file.originalname)
//     }
//   })

//   const uploadQuestions = multer({ 
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//       var ext = path.extname(file.originalname);
//       //console.log(req.files);
      
//       if (ext !== ".pdf" ) {
//         return cb(new Error("Only pdfs are allowed!"));
//       }
  
//       cb(null, true);
//     },
//   });
