const donationHistory = require("../../models/donation");

exports.getAllDonations = (req, res) => {
  let donations = {};
  if (req.query.nameOfPatient) {
    donations.nameOfPatient = req.query.nameOfPatient;
  }
  if (req.query.bloodType) {
    donations.bloodType = req.query.bloodType;
  }
  if (req.query.email) {
    donations.email = req.query.email;
  }
  if (req.query.quantity) {
    donations.quantity = req.query.quantity;
  }
  if (req.query.date) {
    donations.date = req.query.date;
  }

  // Here we are checking req.query for filters
  // And if there are filters, we will use them in the model.find.query
  // To Get All Donations in the Database

  donationHistory.find(donations, (err, users) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ users });
    }
  });
};
