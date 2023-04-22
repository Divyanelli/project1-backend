const express = require("express");
var router = express.Router();

const { signin, signup } = require("../controllers/auth");

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router; 

