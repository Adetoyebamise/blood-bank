const donationHistory = require("../../models/donation");
const newDonor = require("../../models/bloodbank-model/donorModel");

exports.getAllDonations = (req, res) => {
  donationHistory.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ users });
    }
  });
};

exports.searchAllDonations = (req, res) => {
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
  // To Serach for All Donations in the Database

  donationHistory.find(donations, (err, users) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ users });
    }
  });
};

exports.createNewDonor = function (req, res) {
  newDonor.create(
    {
      ...req.body,
    },
    (err, newDonor) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else {
        return res
          .status(200)
          .json({ message: "new donor user profile created", newDonor });
      }
    }
  );
};
