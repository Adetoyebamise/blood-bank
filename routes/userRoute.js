const express = require("express");
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

>>>>>>> 46df526db9f5ee0c105483e86564a35fd8574291
const UserController = require("../controllers/user-controller/userController");

>>>>>>> bb1c8b507ddb0771c87cc0cae38a824815cd1fae
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

router.get("api/v1/bloodbank/:bloodbankid/donorsummary", donationCtrl.getAllDonations);
router.get("api/v1/bloodbank/:bloodbankid/search", donationCtrl.searchAllDonations);
router.post("api/v1/bloodbank/:bloodbankid/newdonor/add", donationCtrl.createNewDonor);
router.get("/api/v1/bloodbank/:bloodbankid/profile", UserCtrl.fetchSingleUser);
router.put("/api/v1/bloodbank/:bloodbankid/profile/save", UserCtrl.updateSingleUser);
router.delete("/api/v1/bloodbank/:bloodbankid/profile/edit", UserCtrl.deleteSingleUser);

<<<<<<< HEAD
<<<<<<< HEAD
module.exports = router;
=======
const UserController = require("../controllers/user-controller/userController")

router.post('/buyblood/:userId', (req, res) => UserController.buyBloodRequest(req, res));

module.exports = router;
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
=======
router.post("/buyblood/:userId", (req, res) =>
  UserController.buyBloodRequest(req, res)
);
=======
// User can search for bloodbanks by name. Name would be in req.body. i.e search form
router.post("/:userID/donate-blood", (req, res) => {
  UserController.search(req, res);
});
>>>>>>> 46df526db9f5ee0c105483e86564a35fd8574291

module.exports = router;
>>>>>>> bb1c8b507ddb0771c87cc0cae38a824815cd1fae
