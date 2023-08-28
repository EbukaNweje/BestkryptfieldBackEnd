const express = require("express")
const cookkieParser = require("cookie-parser")
const fileUploader = require("express-fileupload")
const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoutes")
const cors = require("cors");
const app = express()
const allowedOrigins = ['https://bestkryptfield.org/', 'http://127.0.0.1:5501/'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(fileUploader({
    useTempFiles: true
}))
app.use(cookkieParser())
app.use(express.json());


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
