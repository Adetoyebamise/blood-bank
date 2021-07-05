require("express-async-errors");
const Users = require("../models/user-model/userModel");
//Import Bloodbank model for searching for bloodbanks
const bloodbank = require("../models/bloodbank-model/bloodbankModel");

module.exports = class UserService {
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
};
