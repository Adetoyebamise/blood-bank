require('express-async-errors')
const PendingRequest = require('../models/bloodbank-model/pendingRequest')
const Users = require("../models/user-model/userModel")
const validation = require("../validations/user.validation")

module.exports = class UserServices{
    /**
     * @desc saves a blood purcase request on pending to the database
     * @param {userid} userId 
     * @param {form entries} details 
     * @returns copy of the saved entry
     */
    static async bloodBuyRequest(userId, details) {
        const { error, isValid } = await validation.bloodPurchase(details)
        if(!isValid) {
            return error
        }
        let user = await Users.findById(userId)
        let newRequest = await new PendingRequest({
            hospital: details.hospital,
            patientName: details.patientName,
            bloodType: details.bloodType,
            relationship: details.relationship,
            quantity: details.quantity
        })
        newRequest.userId = user.id
        return await newRequest.save()
    }
}
