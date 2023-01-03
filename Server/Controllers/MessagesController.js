const messageModel = require("../Models/MessageModel")

module.exports.addMessage = async (request, response, next) => {
    try {
        // Getting Message Information
        const { from , to , message } = request.body;

        // Creating the Mongo Collection to push in the Database
        const data = await messageModel.create({
            message: {
                text: message
            },
            users: [from , to],
            sender: from,
        })

        if(data) {
            return response.json({message: "Message Added Successfully"})
        } else {
            return response.json({message: "Failed To Add The Message To The Database"})
        }
    } catch (exeption) {
        next(exeption);
    }
}

module.exports.getAllMessages = async (request, response, next) => {
    try {
        const { from , to } = await request.body;
        const messages = await messageModel.find({
            // Get all messages sent from 'from' user to 'to' user.
            users: {
                $all: [from , to],
            }
            // updateAt: 1 is updating in Ascending Order
        }).sort({updateAt: 1})

        const projectMessages = messages.map((msg) => {
            // Copied Lines:
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        });


        return response.json(projectMessages);
        
    } catch (exeption) {
        next(exeption);
    }
}