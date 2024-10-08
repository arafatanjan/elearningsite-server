const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path");
// const bodyParser = require("body-parser")

const app = express()

const Routes = require("./routes/route.js")
const connect=require('./models/Conn.js')



// const port = 8080;
 const PORT = process.env.PORT || 5000

dotenv.config();



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       if (!fs.existsSync("public")) {
//         fs.mkdirSync("public");
//       }
  
//       if (!fs.existsSync("public/videos")) {
//         fs.mkdirSync("public/videos");
//       }
  
//       cb(null, "public/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });
  
 

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use("/public", express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// app.use('/api', Routes)
app.use("/files", express.static("filename"));


// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(console.log("Connected to MongoDB"))
//     .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))
mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

    
// connect().then(() => {
//     try {
//         app.listen(port, () => {
//             console.log(`Server connected to http://localhost:${port}`)
//         })
//     } catch (error) {
//         console.log("Cannot connect to the server");
//     }
//     app.get('/', (req, res) => {
//         res.send('blah');
//       } )

// }).catch(error => {
//     console.log("Invalid Database Connection");
// })
app.use(cors());
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})