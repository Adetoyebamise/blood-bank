const express = require("express");
const router = express.Router();

//BloodBack controller for authentication
const BloodbankAuthController = require("../controllers/auth/bloodbank.auth");

router.post("/register", (req, res) => {
  BloodbankAuthController.registerBloodbank(req, res);
});

router.post("/login", (req, res) => {
  res.send("Perform login here");
});

module.exports = router;
