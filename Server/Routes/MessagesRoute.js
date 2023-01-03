const { addMessage , getAllMessages } = require("../Controllers/MessagesController");

const router = require("express").Router();

router.post("/addMessage" , addMessage)
router.post("/getAllMessages" , getAllMessages)

module.exports = router;