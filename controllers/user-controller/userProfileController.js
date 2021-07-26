const User = require("../../models/user-model/userModel");

exports.fetchSingleUser = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    } else {
      return res.status(200).json({ users });
    }
  });
};

exports.updateSingleUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!user) {
        return res.status(400).json({ message: "User Profile Not Found" });
      } else {
        user.save((err, savedUser) => {
          if (err) {
            return res.status(400).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "User Profile Updated Successfully" });
          }
        });
      }
    }
  );
};

exports.deleteSingleUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!user) {
      return res.status(404).json({ message: "User Profile was not found" });
    } else {
      return res
        .status(200)
        .json({ message: "User Profile Deleted Successfully" });
    }
  });
};