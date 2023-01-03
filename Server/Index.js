const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/UserRoutes")
const messagesRoute = require("./Routes/MessagesRoute")

const socket = require("socket.io");

const app = express()
require("dotenv").config

app.use(cors());
app.use(express.json())

app.use("/api/auth" , userRoutes)
app.use("/api/messages" , messagesRoute);

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

const io = socket(server , {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})

// Creating a NodeJS Global Online Object
// Stores all the online users.
global.onlineUsers = new Map();

io.on("connection" , (socket) => {
    global.chatSocket = socket;

    // Establishes a socket connection with the online users to the Global Online Users Object
    socket.on("add-user" , (userID) => {
        onlineUsers.set(userID , socket.id);
    })

    // Handles the message sending functionality
    socket.on("send-message" , (data) => {
        // This is the information about the online user's ID
        const sendUserSocket = onlineUsers.get(data.to);

        // When the user is online, send the message directly as well as store in the database
        // If not, then just store it in the database.
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("message-recieve" , data.message)
        }
    })
})