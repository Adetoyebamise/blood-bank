require('express-async-errors')

const bloodBankProfile = require('../models/bloodbank-model/bloodbankModel')
const config = require('../config/config.json')
const validation = require('../validations/user.validation')


module.exports = class BloodBankProfile{
    /**
     * @desc to get a bloodbank profile
     * @params req.params.bloodbankid
     * @returns copy of the saved entry
     */
   static async getBloodBankProfile (id) {
    let foundUser = await bloodBankProfile.findOne({ _id : id });
    
    return foundUser;
    }

    /**
     * @desc to edit a  bloodbank profile
     * @params req.body and req.params.bloodbankid 
     * @returns copy of the saved entry
     */
    static async editBloodBankProfile(id, body) {
        
        const { error, isValid } = await validation.bloodBankProfileUpdate(body)
        // console.log(error)
        if(!isValid) {
            throw error;
        }
        const { bloodbankName, address, website, contactNumber, briefDescription} = body
        let editBloodbank = await bloodBankProfile.findOneAndUpdate({_id : id}, {
            bloodbankName,
            address,
            website,
            contactNumber,
            briefDescription
        }, { new: true, useFindAndModify: false, runValidators: true, upsert: true}, (err, doc) => {
            if (err) {
                return new Error(err)
            } else {
                //console.log(doc)
                doc.save()
            }
        } 
        )
        return editBloodbank
    }
}