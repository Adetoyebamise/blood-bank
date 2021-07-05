<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const User = require("../../models/user-model");
=======
require("express-async-errors");
const UserService = require("../../services/userService");
>>>>>>> bb1c8b507ddb0771c87cc0cae38a824815cd1fae

module.exports = class UserController {
  /**
   *@route PoST /api/v1/user/buyblood/:userId
   *@returns success message and entry if successful else, returns a comprehensice error message
   */
  static async buyBloodRequest(req, res) {
    const bloodRequest = await UserService.bloodBuyRequest(
      req.params.userId,
      req.body
    );
    if (!bloodRequest || bloodRequest.msg) {
      return res
        .status(400)
        .json({ status: "Bad request, try again", err: bloodRequest.msg });
    }
    return res.status(200).json({
      status: "your request for purchase of blood is now pending",
      bloodRequest,
      err: null,
    });
  }
};
<<<<<<< HEAD
=======
=======
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
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
<<<<<<< HEAD
}
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
=======
}
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
=======
>>>>>>> bb1c8b507ddb0771c87cc0cae38a824815cd1fae
