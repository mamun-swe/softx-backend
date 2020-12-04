const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

app.use('/uploads/books', express.static('uploads/books/'))

// Main Routes
const AuthRoute = require("./api/routes/Auth")
const LibrarianRoute = require("./api/routes/Librarian")
const StudentRoute = require("./api/routes/Student")

// API URL's
app.use("/api/auth", AuthRoute)
app.use("/api/librarian", LibrarianRoute)
app.use("/api/student", StudentRoute)

app.use((req, res, next) => {
    let error = new Error('404 page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.status(404).json({
            message: error.message
        })
    }
    if (error.status == 400) {
        return res.status(400).json({
            message: "Bad request"
        })
    }
    return res.status(500).json({
        message: "Internal Server Error"
    })
})


app.get('/', (req, res) => {
    res.send("Hello I am node.js application")
})

// DB Connection here
const URL = "mongodb://localhost:27017/softx"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false,
    useFindAndModify: false
}).then(() => console.log("Database connected"));

// App Port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App running on ${port} port`)
})