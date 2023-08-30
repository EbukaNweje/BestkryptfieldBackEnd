const express = require("express")
const cookkieParser = require("cookie-parser")
const fileUploader = require("express-fileupload")
const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoutes")
const cors = require("cors");
const app = express()
const request = require('request');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  const allowedOrigins = ['https://bestkryptfield.org'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
// app.use(cors());
app.use(express.json());

app.use(fileUploader({
    useTempFiles: true
}))
app.use(cookkieParser())



app.use("/api", authRouter)
app.use("/api", userRouter)

app.use((err, req, res, next)=>{
   const errorStatus = err.status || 500
   const errorMessage = err.message || "Something went wrong!"
   return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
   })
})

app.use("/", (req, res) => {
    res.status(200).send("My Teacher Api")
})

module.exports = app
