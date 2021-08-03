const userNeedRequest = require("../../services/bloodbank-purchase/userPending");
const { static } = require('express');
require('express-async-errors');

module.exports = class UserPendingController {
    static async getUserPendingSummary(req, res) {
        try {
            let userSummaryController = await userNeedRequest.getUserPendingSummary(req.params.userid)
            console.log(userSummaryController)
            res.status(200).json({"code" : "SUCCESS", 'success' : userSummaryController, "error":null});
        } catch (error) {
            res.status(400).json({"message" : "You are missing vital credentials"})
        }

    }
    static async editUserPendingSummary(req, res) {
        try {
            let editUserStatusNeed = await userNeedRequest.editUserPendingSummary(req.params.id)
            //res.status(201).send({"message":"A user request update done" })
            res.status(200).json({ "code": 'SUCCESS', 'success': editUserStatusNeed, "error": null });
        } catch (error) {
            res.status(500).json({ "code": 'FAILED', success: null, error: error.message })
        }
    }
    static async deleteUserPendingSummary(req, res) {
        try {
            let deleteUserNeed = await userNeedRequest.deleteUserPendingSummary(req.params.userid)
            res.status(201).send({"message":"A user request has been cancelled" })
            //res.status(200).json({ "code": 'SUCCESS', 'success': deleteUserNeed, "error": null });
        } catch (error) {
            res.status(500).json({ "code": 'FAILED', success: null, error: error.message })
        }
    }
}   