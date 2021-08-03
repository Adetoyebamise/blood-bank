require("express-async-errors");
const UserService = require("../../services/userService");
module.exports = class UserController {
  /**
   *@route PoST /api/v1/user/buyblood/:userId
   *@returns success message and entry if successful else, returns a comprehensive error message
   */
  static async buyBloodRequest(req, res) {
    const bloodRequest = await UserService.bloodBuyRequest(
      req.params.userId,
      req.params.bloodBankId,
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

  /**
   * @route PuT /api/v1/user/:userID/status/pendingsummary/:pendingRequestId/edit
   * @returns edited pending request
   */
  static async editPendingRequest(req, res) {
    try {
      const params = req.params;

      let request = await UserService.editPendingRequest(params, req.body);
      res.status(200).json({
        status: "your request has been updated",
        request,
        err: null,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: "Bad request, try again", err: err });
    }
  }
};
