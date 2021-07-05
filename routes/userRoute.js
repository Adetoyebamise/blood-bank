const express = require("express");
const router = express.Router();
<<<<<<< HEAD
// we will need to bring in the user middleware authentication object here

const UserCtrl = require("../controllers/user-controller/userController");

// router.get();

/** This is a GET Request to Endpoint
api/v1/user/user:id/profile/
to get all users
 * */
router.get("/api/v1/user/user:id/profile", UserCtrl.fetchSingleUser);

/**
 * This is a PUT Request to Endpoint
 * api/v1/user/user:id/profile/update
 * to Update the profile of a user
 */
router.put("/api/v1/user/user:id/profile/update", UserCtrl.updateSingleUser);

/**
 * This is a DELETE Request to Endpoint
 * api/v1/user/user:id/profile/edit
 * to Edit the profile of a user
 */

router.delete("/api/v1/user/user:id/profile/edit", UserCtrl.deleteSingleUser);

module.exports = router;
=======
const UserController = require("../controllers/user-controller/userController")

router.post('/buyblood/:userId', (req, res) => UserController.buyBloodRequest(req, res));

module.exports = router;
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
