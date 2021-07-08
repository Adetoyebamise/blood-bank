const donationHistory = require("../../models/donation");

exports.getAllDonations = (req, res) => {
  donationHistory.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ users });
    }
  });
};
