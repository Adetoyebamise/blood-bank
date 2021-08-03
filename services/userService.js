//Import Bloodbank model for searching for bloodbanks
const bloodbank = require("../models/bloodbank-model/bloodbankModel");
require("express-async-errors");
const PendingRequest = require("../models/bloodbank-model/pendingRequest");
const Users = require("../models/user-model/userModel");
const validation = require("../validations/user.validation");

module.exports = class UserService {
  /**
   * @desc saves a blood purcase request on pending to the database
   * @param {userid} userId
   * @param {form entries} details
   * @returns copy of the saved entry
   */
  static async bloodBuyRequest(userId, details) {
    const { error, isValid } = await validation.bloodPurchase(details);
    if (!isValid) {
      return error;
    }
    let user = await Users.findById(userId);
    let newRequest = await new PendingRequest({
      bloodBank: details.bloodBank,
      nameOfPatient: details.nameOfPatient,
      bloodType: details.bloodType,
      relationship: details.relationship,
      quantity: details.quantity,
    });
    newRequest.userId = user.id;
    return await newRequest.save();
  }

  /**
   * @param {search for bloodbank} search
   * @returns list of blood bank that matches search text
   */
  static async search(bloodbankName) {
    //Search db for related bloodbank name
    let bloodbanks = await bloodbank.find({
      bloodbankName: { $regex: ".*" + bloodbankName + ".*" },
    });
    //return search result
    return bloodbanks;
  }

  /**
   * @param {search for bloodbank} search
   * @returns edited pending request
   */

  static async editPendingRequest(params, body) {
    let request = await PendingRequest.findOne({
      _id: params.pendingsummaryId,
    });

    if (request.userId != params.userId) {
      throw "error, something went wrong";
    }

    request.bloodBank = body.bloodBank || request.bloodBank;
    request.nameOfPatient = body.nameOfPatient || request.nameOfPatient;
    request.relationship = body.relationship || request.relationship;
    request.bloodType = body.bloodType || request.bloodType;
    request.quantity = body.quantity || request.quantity;

    await request.save();
    return request;
  }
};
