require("express-async-errors");
const BloodBank = require("../models/bloodbank-model/bloodbankModel");
const Donation = require("../models/donation")
const validator = require('../validations/user.validation')
const PendingRequest = require('../models/bloodbank-model/pendingRequest')
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

  /**
   * @desc creates details for a new donation
   * @param {recipient bloodbank} bloodBankId 
   * @param {donation details} details 
   * @returns copy of donation details
   */
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

  /**
   * @desc gets all donations made to a specified bloodbank
   * @param {bloodBank id} bloodBankId 
   * @returns a list of all donations made to the specified bloodbank
   */
  static async retrieveDonations(bloodBankId) {
    return await Donation.find({ bloodBank: bloodBankId })
  }

  /**
   * @desc gets all pending requests for a specified bloodbank
   * @param {bloodbank id} bloodBankId 
   * @returns an array of all pending requests
   */
  static async retrievePendingRequests(bloodBankId) {
    return await PendingRequest.find({ bloodBank: bloodBankId, isPending: "pending" })
  }

  /**
   * @desc change status of a request to 'accepted'
   * @param {requestId} requestId 
   * @returns the updated request details
   */
  static async approvePendingRequest(requestId) {
    return await PendingRequest.findOneAndUpdate({ _id: requestId }, { isPending: "accepted" }, { runValidators: true, new: true })
  }

  /**
   * @desc change status of a request to 'cancel'
   * @param {requestId} requestId 
   * @returns the updated request details
   */
  static async rejectPendingRequest(requestId) {
    return await PendingRequest.findOneAndUpdate({ _id: requestId }, { isPending: "cancel" }, { runValidators: true, new: true })
  }

  /**
   * @desc gets all accepted requests by a specified bloodbank
   * @param {bloodbankId} bloodBankId 
   * @returns all the accepted request for the particular bloodbank
   */
  static async approvedPendingRequests(bloodBankId) {
    return await PendingRequest.find({ bloodBank: bloodBankId, isPending: "accepted" })
  }

  /**
   * @desc gets all rejected requests by a specified bloodbank
   * @param {bloodbankId} bloodBankId 
   * @returns all the cancelled request for the particular bloodbank
   */
  static async rejectedPendingRequests(bloodBankid) {
    return await PendingRequest.find({ bloodBank: bloodBankid, isPending: "cancel" })
  }
};