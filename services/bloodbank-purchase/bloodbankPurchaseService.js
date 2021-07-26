require("express-async-errors");
const bloodBankModel = require("../../models/bloodbank-model/bloodbankModel");
class BloodBankPurchase {
  /**
   * @desc gets all bloodbanks with the actual bloodtype requested
   * @param {bloodtype} bloodtype
   * @returns list of all bloodbanks with a particular blood type
   */
  static async getBloodBanks(bloodtype) {
    return await bloodBankModel.find({ bloodtype: bloodtype }).exec();
  }
}
module.exports = BloodBankPurchase;
