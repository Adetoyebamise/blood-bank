const purchaseRequest = require("../../models/purchaseRequest");
const UserHistoryServices = require('../../services/userHistoryServices')
const { static } = require('express');
// exports.getUserHistory = (req, res) => {
//   let purchaseRequests = {};
//   if (req.query.nameOfPatient) {
//     purchaseRequests.nameOfPatient = req.query.nameOfPatient;
//   }
//   if (req.query.bloodType) {
//     purchaseRequests.bloodType = req.query.bloodType;
//   }
//   if (req.query.email) {
//     purchaseRequests.email = req.query.email;
//   }
//   if (req.query.quantity) {
//     purchaseRequests.quantity = req.query.quantity;
//   }
//   if (req.query.date) {
//     purchaseRequests.date = req.query.date;
//   }

  module.exports = class RequestController {
    static async getUniqId(req, res) {
        try {
          let userUniqueId  = await UserHistoryServices.getUniqId(req.params.userid)
          console.log(userUniqueId);
    
            res.status(200).json({"code" :"SUCCESS", 'success': userUniqueId, "error":null});
          
        } catch (error) {
          res.status(400).send({"message" : "You are missing vital credentials"})
        }
      }
    }
    

  
  
// Here we are checking req.query for filters
//   And if there are filters, we will use them in the model.find.query
//   To Get purchase request in the Database




// requestHistory.find(purchaseRequests, (err, users) => {
//     if (err) {
//       return res.status(500).json({ message: err });
//     } else {
//       return res.status(200).json({ users });
//     }
//   });

