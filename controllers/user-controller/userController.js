const userService = require("../../services/userService")

const { static } = require('express');



module.exports = class userController {
    static async userDetail(req, res) {
        try {
          let nameOfPatient = req.body.nameOfPatient
          console.log(nameOfPatient);
         let newUserHistory = await userService.userDetail(req.body.nameOfPatient);
    
         
         res.status(201).json({"code" :"SUCCESS", "success": newTodo, "error":null});
          
        } catch (error) {
          res.status(500).json({code: 'FAILED', success: null, error: error.message || "you cannot create todo for now" });
         
         }
          
        }


    static async getUniqId(req, res){
        try {
            let eachUserHistory = await userService.getUniqId(req.params.id);

            res.status(200).json({code: 'SUCCESS', 'success': eachUserHistory, error:null})
        } catch (error) {
            res
            res.status(400).send({"message" : "You are missing vital credentials"})
        }
      }
    
}