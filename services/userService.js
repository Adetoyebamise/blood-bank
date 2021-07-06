const { v4: uuidv4 } = require('uuid');
const userHistory = require('../models/purchaseRequest');

module.exports = class userService {
    /**
     * 
     * @param {string} nameOfPatient request history displayed
     */

     static async userDetail(nameOfPatient) {
  
       let newUserHistory = new userHistory({
       uniqueId: uuidv4(),
       nameOfPatient,
        
      
         });
         return newUserHistory.save();
        }
     static async getUniqId (id) {
            return userHistory.findbypk({ uniqueId: id });
            }

    }