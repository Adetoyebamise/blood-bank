<<<<<<< HEAD
const User = require("../../models/user-model");

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
=======
require('express-async-errors')
const UserService = require('../../services/userService')

module.exports = class UserController{
    /**
    *@route PoST /api/v1/user/buyblood/:userId
    *@returns success message and entry if successful else, returns a comprehensice error message
     */
    static async buyBloodRequest(req, res) {
        const bloodRequest = await UserService.bloodBuyRequest(req.params.userId, req.body)
        if(!bloodRequest || bloodRequest.msg) {
            return res.status(400).json({ status: "Bad request, try again", err: bloodRequest.msg })
        }
        return res.status(200).json({
            status: 'your request for purchase of blood is now pending',
            bloodRequest,
            err: null})
    }
}
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
