require('express-async-errors');
const requestPublicBloodBank = require('../../models/bloodbank-model/pendingRequest')


module.exports = class PublicBankRequest{
    /**
     * @desc to get all pending public blood bank request, accepted & cancelled requests
     * @params req.params.userId
     * @returns copy of the saved entry
     */
    static async getPublicBankRequest () {

        let publicUser = await requestPublicBloodBank.find();

        return publicUser;
    }
    static async approvePublicBankRequest () {
        let approvePublicRequest = await requestPublicBloodBank.find();

        return approvePublicRequest;
    }
    static async deletePublicBankRequest (userId) {
        let deletePublicRequest = await requestPublicBloodBank.findOneAndRemove(userId);

        return deletePublicRequest;
    }
}
