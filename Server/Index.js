const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
require("dotenv").config

app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true, useUnifiedTopology: true
    // console.log("Connected Successfully")
}).then(() => {
    console.log("Database Connected")
})
.catch((error) => {
    console.log(error)
})

const server = app.listen(process.env.PORT, () => {
    console.log("Server Started on PORT: " + process.env.PORT);
})