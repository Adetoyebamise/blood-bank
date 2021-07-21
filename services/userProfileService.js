require('express-async-errors')
const userBloodBankProfile = require('../models/user-model/userModel')
const validation = require('../validations/user.validation')

module.exports = class Userprofile{
    /**
     * @desc to get a user bloodbank profile
     * @params req.params.id
     * @returns copy of the saved entry
     */
   static async getUserProfile (id) {
    let oneUser = await userBloodBankProfile.findOne({ _id: id });
    
    return oneUser;
    }
  
    /**
     * @desc to edit a public bloodbank profile
     * @params req.body and req.params.bloodbankid 
     * @returns copy of the saved entry
     */
    static async editUserProfile(id, body) {
        
        const { error, isValid } = await validation.userProfileUpdate(body)
        console.log(error)
        if(!isValid) {
            throw error;
        }
        const { gender, dateOfBirth, email, phoneNumber} = body

                let userProfile = await userBloodBankProfile.findOneAndUpdate({_id: id}, {
                    gender,
                    dateOfBirth,
                    email,
                    phoneNumber
                  }, { new: true, useFindAndModify: false, runValidators: true, upsert: true, setDefaultsOnInsert: true}, (err, doc) => {
                      if (err) {
                          return new Error(err)
                      } else {
                          doc.save()
                      }
                  } 
                  )
                  return userProfile
           
                }
            }