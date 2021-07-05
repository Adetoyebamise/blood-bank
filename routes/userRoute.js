const express = require("express");
const router = express.Router();
//User controller
const user = require("../controllers/user-controller/userController");

// User can search for bloodbanks by name. Name would be in req.body. i.e search form
router.post("/:userID/donate-blood", (req, res) => {
  user.search(req, res);
});

module.exports = router;
