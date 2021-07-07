require('express-async-errors')
const BloodBank = require('../models/bloodbank-model/bloodbankModel')

/**
<<<<<<< HEAD
=======
 * @desc Get all public bloodbanks
>>>>>>> 315067982ba1c9d602173e53827eb50d9c2703bf
 * @returns an array of all available public bloodbanks
 */
module.exports = class bloodbankServices{
    static async retrieveAllPublicBloodbanks() {
        return await BloodBank.find({ bloodbankType: 'public' }, { bloodbankName: true, _id: false }).lean()
    }
}