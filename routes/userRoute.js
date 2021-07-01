const express = require("express");
const router = express.Router();
// we will need to bring in the user middleware authentication object here

const UserCtrl = require("../controllers/user-controller/userController");

router.get();

/** 
This is a POST Request to Endpoint 
api/v1/user/user:id/profile/save 
to create a new user
* */
router.post("/api/v1/user/user:id/profile/save", UserCtrl.createNewUser);

module.exports = router;
