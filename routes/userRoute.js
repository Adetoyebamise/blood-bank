const express = require("express");
const userController = require("../controllers/user-controller/userController");
const router = express.Router();

router.post('/',userController.userDetail);

router.get('api/v1/user:id/history/requestsummary', userController.getUniqId);
