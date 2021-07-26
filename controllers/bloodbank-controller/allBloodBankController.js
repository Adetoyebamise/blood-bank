const bloodBankProfile = require('../../services/publicBloodBankProfile')
const { static } = require('express');
require('express-async-errors');



module.exports = class BloodBankController {
    static async getBloodBankProfile(req, res) {
        try {
          let userUniqueId  = await bloodBankProfile.getBloodBankProfile(req.params.bloodbankid)
          let bloodbankDetails = {
            bloodbankname: userUniqueId.bloodbankName,
            bloodbankType: userUniqueId.bloodbankType,
            email: userUniqueId.email
          }
          console.log(bloodbankDetails);
    
            res.status(200).json({"code" :"SUCCESS", 'success': bloodbankDetails, "error":null});
          
        } catch (error) {
          res.status(400).json({"message" : "You are missing vital credentials"})
        }
      }

      static async editBloodBankProfile(req, res) {
        try {
          let foundBloodBank = await bloodBankProfile.editBloodBankProfile(req.params.bloodbankid, req.body)
          console.log(foundBloodBank)
          res.status(200).json({"code" :"SUCCESS", 'success': foundBloodBank, "error":null});
        } catch (error) {
          console.log(error)
          res.status(400).json({"message" : error})
        }
      }
    }
    