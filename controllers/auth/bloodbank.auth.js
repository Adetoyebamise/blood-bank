require("express-async-errors");
const bloodbankAuthService = require("../../services/auth/bloodbank.auth");

module.exports = class BloodbankAuthController {
  /**
   * @route POST /api/v1/bloodbank/auth/register
   * @returns bloodbank profile if successfull else, returns an error message
   */
  static async registerBloodbank(req, res) {
    //Receive http post request, send to service and wait for result
    let bloodbank = await bloodbankAuthService.bloodbankRegistration(req.body);

    //If theres no result, send response
    if (
      bloodbank == "Password do not match" ||
      bloodbank == "Email already Exist"
    ) {
      return res.status(400).json({ err: "Bad request", message: bloodbank });
    }

    if (!bloodbank) {
      return res.status(400).json({
        err: "Bad request",
        message: "Opppppsssss Something went wrong",
      });
    }

    //If there is, set the passwords coming from the service result to undefined and send response
    bloodbank.password = undefined;
    return res.status(200).json({
      success: true,
      data: bloodbank,
      err: null,
    });
  }

  /**
   * @route POST /api/v1/bloodbank/auth/login
   * @returns bloodbank profile if successfull else, returns an error message
   */
  static async LoginBloodbank(req, res) {
    //Receive http post request, send to service and wait for result
    let bloodbank = await bloodbankAuthService.bloodbankLogin(req.body);

    //Check result and send appropriate response
    if (
      bloodbank == "BloodBank not Found" ||
      bloodbank == "Email or Password Incorrect"
    ) {
      return res.status(400).json({ err: "Bad request", message: bloodbank });
    }

    if (!bloodbank) {
      return res.status(400).json({
        err: "Bad request",
        message: "Opppppsssss Something went wrong",
      });
    }

    //If there is, set the passwords coming from the service result to undefined and send response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: bloodbank,
      err: null,
    });
  }
};
