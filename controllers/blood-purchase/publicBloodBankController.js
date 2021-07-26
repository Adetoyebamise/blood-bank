const publicRequest = require('../../services/bloodbank-purchase/publicBloodBankRequest')
const { static } = require('express');

module.exports = class PublicBloodBankController{
    static async getPublicBankRequest(req, res) {
        try {
            let publicBloodBankController = await publicRequest.getPublicBankRequest(req.params.bloodbankid)
            console.log(publicBloodBankController)
            res.status(200).json({"code" : "SUCCESS", 'success': publicBloodBankController, "error":null});
        } catch (error) {
            res.status(400).json({"message" : "You are missing vital credentials"})
        }
    }
    static async deletePublicBankRequest(req, res) {
        try {
            let deletePublicRequest = await publicRequest.deletePublicBankRequest(req.params.bloodbankid)
            res.status(201).send({"message":"A user request has been cancelled" })
            //res.status(200).json({ "code": 'SUCCESS', 'success': deletePublicRequest, "error": null });
        } catch (error) {
            res.status(500).json({ "code": 'FAILED', success: null, error: error.message })
        }
    }
    static async approvePublicBankRequest(req, res) {
        try {
            let approvepublicController = await publicRequest.approvePublicBankRequest(req.params.bloodbankid)
            res.status(201).send({"message":"All user request has been accepted!" })
            // res.status(200).json({"code" : "SUCCESS", 'success': approvepublicController, "error":null});
        } catch (error) {
            res.status(400).json({"message" : "You are missing vital credentials"})
        }
    }
}