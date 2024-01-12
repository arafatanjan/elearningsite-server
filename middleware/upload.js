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

  const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
      //console.log(req.files);
      
      if (ext !== ".mkv" && ext !== ".mp4") {
        return cb(new Error("Only videos are allowed!"));
      }
  
      cb(null, true);
    },
  });

  module.exports= upload;