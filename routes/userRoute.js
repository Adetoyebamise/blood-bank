const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller/userController")

router.post('/buyblood/:userId', (req, res) => UserController.buyBloodRequest(req, res));

module.exports = router;