const { register , login } = require("../Controllers/UserController");

const router = require("express").Router();

router.post("/register" , register)
router.post("/login" , login)
router.post('/setAvatar/:id' , setAvatar);

module.exports = router;