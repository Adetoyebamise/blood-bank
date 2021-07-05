const express = require("express");
const router = express.Router();

// we will need to bring in the user middleware authentication object here
const authenticateUser = require("../controllers/auth/user.auth");
// require("../middlewares/index");

const UserCtrl = require("../controllers/user-controller/userController");
const donationCtrl = require("../controllers/user-controller/donationHistory");
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

router.get(
  "/api/v1/user/user:id/history/donationsummary",
  donationCtrl.getAllDonations
);
/**
 * This is a GET Request to Endpoint
 * api/v1/user/user:id/history/donationsummary
 * to implement Donation History
 */
router.put("/api/v1/user/user:id/profile/update", UserCtrl.updateSingleUser);

/**
 * This is a DELETE Request to Endpoint
 * api/v1/user/user:id/profile/edit
 * to Edit the profile of a user
 */

router.delete("/api/v1/user/user:id/profile/edit", UserCtrl.deleteSingleUser);

module.exports = router;
