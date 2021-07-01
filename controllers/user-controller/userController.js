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
