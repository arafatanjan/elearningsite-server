const mongoose = require('mongoose');

// module.exports.connect=()=>{
//     await mongoose.connect("process.env.ATLAS_URI");
//      console.log("Database Connected")
//     }

async function connect(){
    await mongoose.connect(process.env.ATLAS_URI),
    console.log("Database Connected")
}

module.exports=connect;