const { register } = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/register" , register)

module.exports = router;