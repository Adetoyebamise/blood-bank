const userProfileRequest = require('../../services/userProfileService')
const { static } = require('express');
require('express-async-errors');


module.exports = class UseBloodBankController {
    static async getUserProfile(req, res) {
        try {
          let userUniqueId  = await userProfileRequest.getUserProfile(req.params.userid)
          let userDetails = {
            email: userUniqueId.email,
            fullName: userUniqueId.fullName
          }
          console.log(userDetails);
    
            res.status(200).json({"code" :"SUCCESS", 'success': userDetails, "error":null});
          
        } catch (error) {
          res.status(400).json({"message" : "You are missing vital credentials"})
        }
      }

      static async editUserProfile(req, res) {
        try {

          let foundUser = await userProfileRequest.editUserProfile(req.params.userid, req.body)

         return res.status(200).json({"code" :"SUCCESS", 'success': foundUser, "error":null});
         
        } catch (error) {
          console.log(error)
         return res.status(400).json({"message" : error})
        }
      }
    }