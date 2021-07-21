require('express-async-errors')

const userHistory = require('../models/bloodbank-model/pendingRequest')


module.exports = class UserHistoryServices{
    /**
     * @desc saves a blood purcase request on pending to the database
     * @param {userid} userId 
     * @param {form entries} details 
     * @returns copy of the saved entry
     */
   static async getUniqId (id) {
    let foundUser = await userHistory.findOne({ userId : id });
    return foundUser
    }
}