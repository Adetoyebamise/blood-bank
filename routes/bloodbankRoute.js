const express = require("express");
const router = express.Router();
//const { registerUser } = require('../controllers/auth/user.auth')

router.get("/", (req, res) => {
  res.send("Other routes here");
});

module.exports = router;
