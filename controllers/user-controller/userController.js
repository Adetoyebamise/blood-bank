require("express-async-errors");
const UserService = require("../../services/userService");

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
  
  * @route PoST /api/v1/user/:userID/donate-blood
   * @returns list of bloodbank with search request
   */
  static async search(req, res) {
    let bloodbankName = req.body.search;
    const searchResult = await UserService.search(bloodbankName);

    res.json({
      success: true,
      data: searchResult,
      error: null,
};
