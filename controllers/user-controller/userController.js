require("express-async-errors");
const UserService = require("../../services/userService");

module.exports = class UserController {
  /**
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
    });
  }
};
