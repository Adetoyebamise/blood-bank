require('express-async-errors');

const userSummary = require('../../models/bloodbank-model/pendingRequest.js')

module.exports = class UserPendingSummary{
    /**
     * @desc to get User pending summary
     * @params req.params.bloodbankid
     * @returns copy of the saved entry
     */
    static async getUserPendingSummary (id) {
        let uniqUser = await userSummary.findOne({_id:id});
        return uniqUser;
    }
    // static async getUserPendingSummary () {
    //     let uniqUser = await userSummary.find();
    //     return uniqUser;
    // }

    static async editUserPendingSummary(id) {
        let editUserPending = await userSummary.findOneAndUpdate({_id : id }, { new: true, useFindAndModify: false, runValidators: true, upsert: true}, (err, doc) => {
            if (err) {
                return new Error(err)
            } else {
                //console.log(doc)
                doc.save()
            }
        } 
        )
        return editUserPending
    }
    static async deleteUserPendingSummary (id) {
        let deleteUserBloodNeed = await userSummary.findOneAndRemove(id)

        return deleteUserBloodNeed;
    }
}