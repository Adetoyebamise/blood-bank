const User = require("../../models/user-model");

exports.createNewUser = function (req, res) {
  User.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },
    (err, newUser) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      } else {
        return res.status(200).json({ message: "new user created", newUser });
      }
    }
  );
};

exports.fetchUsers = (req, res) => {
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
        return res.status(400).json({ message: "User Not Found" });
      } else {
        user.save((err, savedUser) => {
          if (err) {
            return res.status(400).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "User Updated Successfully" });
          }
        });
      }
    }
  );
};
