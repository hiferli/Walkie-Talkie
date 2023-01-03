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

module.exports.getAllMessages = async (request, response, next) => {}