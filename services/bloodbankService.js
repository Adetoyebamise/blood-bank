require("express-async-errors");
const BloodBank = require("../models/bloodbank-model/bloodbankModel");
const Donation = require("../models/donation")
const validator = require('../validations/user.validation')
module.exports = class bloodbankServices {
  /**
 * @desc Get all public bloodbanks
 * @returns an array of all available public bloodbanks
 */
  static async retrieveAllPublicBloodbanks() {
    return await BloodBank.find(
      { bloodbankType: "public" },
      { bloodbankName: true, _id: false }
    ).lean();
  }

  static async makeDonation(bloodBankId, details) {
    const { error, isValid } = await validator.newDonation(details)
    if(!isValid) {
      return error
    }
    let bloodBank = await BloodBank.findById(bloodBankId)
    let newDonation = new Donation({
      nameOfPatient: details.nameOfPatient,
      email: details.email,
      bloodType: details.bloodType,
      quantity: details.quantity
    })
    newDonation.bloodBank = bloodBank.id
    return await newDonation.save()
  }
};
