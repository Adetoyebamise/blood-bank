const express = require("express");
const userController = require("../controllers/user-controller/userController");
const router = express.Router();
const UserController = require("../controllers/user-controller/userController");

// we will need to bring in the user middleware authentication object here
const authenticateUser = require("../controllers/auth/user.auth");
// require("../middlewares/index");

const UserCtrl = require("../controllers/user-controller/userController");
const donationCtrl = require("../controllers/user-controller/donationHistory");
const userHistoryRequestController = require("../controllers/user-controller/requestHistory")

router.post("/buyblood/:userId", (req, res) =>
  UserController.buyBloodRequest(req, res)
);

/**
 *  Request to Various Endpoints
 * api/v1/user/user:id/profile/
 * to Update the profile of a user and
 * Quering the DB for user Blood Donation history
 */

router.get(
  "/api/v1/user/user:id/history/donationsummary",
  donationCtrl.getAllDonations
);

router.get("/api/v1/user/user:id/profile", UserCtrl.fetchSingleUser);
router.put("/api/v1/user/user:id/profile/update", UserCtrl.updateSingleUser);
router.delete("/api/v1/user/user:id/profile/edit", UserCtrl.deleteSingleUser);

/**
 * Request to User Request history endpoint
 * api/v1/user:id/history/requestsummary
 * querying the DB for all user request history
 */

router.get(
  "/api/v1/user/user:id/history/requestsummary", 
  userHistoryRequestController.getUserHistory
)

module.exports = router;
