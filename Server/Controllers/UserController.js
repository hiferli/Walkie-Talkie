const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

module.exports.register = async (request, response, next) => {
    try {
        // console.log(request.body);
        const { username, email, password } = request.body;

        // If the username already exists, it returns true and else it returns a false
        const usernameAlreadyExists = await User.findOne({ username });

        if (usernameAlreadyExists) {
            return response.json({ errorMessage: "The Username Already Exists! Please Login...", status: false });
        }

        // If the username is already registered, it returns true and else it returns a false
        const emailAlreadyRegistered = await User.findOne({ email });

        if (emailAlreadyRegistered) {
            return response.json({ errorMessage: "The Email Is Already Registered With Another User! Please Use Another Email Address...", status: false });
        }

        // Secure the password with an Encryption, with Salt Value as 10
        const encryptedPassword = await bcrypt.hash(password, 10);

        // console.log(username)
        // console.log(email)
        // console.log(password)

        // Registering the user to the database
        const user = await User.create({
            username , email, password: encryptedPassword
        })

        // Delete Password for security
        delete user.password

        // Returning a success flag, marking registered users
        return response.json({ status: true, user });
    } catch (exeption) {
        next(exeption);
    }
}

module.exports.login = async (request, response, next) => {
    try {
        // console.log(request.body);
        const { username , password } = request.body;

        // If the username already exists, it returns true and else it returns a false
        const user = await User.findOne({ username });
        
        if (!user) {
            return response.json({ errorMessage: "Incorrct Username or Password...", status: false });
        }
        
        // If the username is already registered, it returns true and else it returns a false
        const isPasswordValid = await bcrypt.compare(password , user.password);
        
        if (!isPasswordValid) {
            return response.json({ errorMessage: "Incorrct Username or Password...", status: false });
        }
        delete user.password;
        
        
        // Returning a success flag, marking registered users
        return response.json({ status: true, user });
    } catch (exeption) {
        next(exeption);
    }
}

module.exports.setAvatar = async (request, response, next) => {
    try {
        const userID = request.params.id;
        const avatarImage = request.body.image
        const userData = await User.findByIdAndUpdate(userID , {
            isAvatarImageSet: true,
            avatarImage: avatarImage
        })
        
        return response.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (exeption) {
        next(exeption)
    }
}

module.exports.getAllUsers = async (request, response, next) => {
    try {
        // This line gets information from the MongoDB Database.
        // The _id : { $ne: request.params.id } line returns all the other users with ID not equal to the ID of the user

        const users = await User.find({ _id : { $ne: request.params.id }}).select([
            // From the information fetched from the Database, only the following information is extracted
            // To display on the Contacts Segment in the Chat Page
            "email",
            "username",
            "avatarImage",
            "_id"
        ])

        return response.json(users);
    } catch (exeption) {
        next(exeption);
    }
}