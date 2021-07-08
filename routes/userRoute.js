const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user-controller/userController");

// we will need to bring in the user middleware authentication object here
const authenticateUser = require("../controllers/auth/user.auth");
// require("../middlewares/index");

const UserCtrl = require("../controllers/user-controller/userProfileController");
const donationCtrl = require("../controllers/user-controller/donationHistory");

router.post("/buyblood/:userId", (req, res) =>
  UserController.buyBloodRequest(req, res)
);

/**
 *  Request to Various Endpoints
 * api/v1/user/user:id/profile/
 * to Update the profile of a user and
 * Quering the DB for user Blood Donation history
 */

router.get("/:userId/donorsummary", donationCtrl.getAllDonations);
router.get("/:userId/search", donationCtrl.searchAllDonations);
router.post("/:userId/newdonor/add", donationCtrl.createNewDonor);

router.get("/:userId/profile", UserCtrl.fetchSingleUser);
router.put("/:userId/profile/save", UserCtrl.updateSingleUser);
router.delete("/:userId/profile/edit", UserCtrl.deleteSingleUser);

router.post("/buyblood/:userId", (req, res) =>
  UserController.buyBloodRequest(req, res)
);

// User can search for bloodbanks by name. Name would be in req.body. i.e search form
router.post("/:userID/donate-blood", (req, res) => {
  UserController.search(req, res);
});

module.exports = router;
