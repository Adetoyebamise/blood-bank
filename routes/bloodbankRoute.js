const express = require("express");
const BloodbankController = require("../controllers/bloodbank-controller/bloodbankController");
const router = express.Router();

//GET all public bloodbanks/hospitals
router.get('/public', (req, res) => BloodbankController.getAllPublicBloodbanks(req, res))

module.exports = router;
