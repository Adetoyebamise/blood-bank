require('express-async-errors')
const BloodbankService = require("../../services/bloodbankService")

module.exports = class BloodbankController{
    /**
     * @route GET /api/v1/bloodbank/public
     * @returns an array of all available public bloodbanks if successful
     */
    static async getAllPublicBloodbanks(req, res) {
        const bloodbanks = await BloodbankService.retrieveAllPublicBloodbanks()
        if(!bloodbanks) {
            return res.status(400).json({ err: 'an error occured while loading available bloodbanks'})
        }
        return res.status(200).json({ bloodbanks, err: null})
    }

    /**
     * @route PoST /api/v1/bloodbank/donations/:bloodbankid
     * @returns details for the registered donation
     */
    static async newDonation(req, res) {
        const donation = await BloodbankService.makeDonation(req.params.bloodBankid, req.body)
        if(!donation || donation.msg) {
            return res.status(400).json({ status: "Bad request, try again!", err: donation.msg })
        }
        return res.status(200).json({ donation, err: null })
    }

    /**
     * @route GET /api/v1/bloodbank/donations/:bloodbankid
     * @returns all donations made to the specified bloodbank
     */
    static async getAllDonations(req, res) {
        const donations = await BloodbankService.retrieveDonations(req.params.bloodBankid)
        if(!donations) {
            return res.status(400).json({ err: 'an error occured while loading donations' })
        }
        return res.status(200).json({ donations, err: null })
    }

    /**
     * @route GET /api/v1/bloodbank/pending-request/:bloodbankid
     * @returns all pending requests directed to the specified bloodbank
     */
    static async getPendingRequests(req, res) {
        const requests = await BloodbankService.retrievePendingRequests(req.params.bloodBankid)
        if(!requests) {
            return res.status(400).json({ err: 'an error occured while loading pending requests' })
        }
        return res.status(200).json({ requests, err: null })
    }

    /**
     * @route PUT /api/v1/bloodbank/accept/:requestId
     * @returns the updated request details
     */
    static async acceptPendingRequest(req, res) {
        const acceptedRequest = await BloodbankService.approvePendingRequest(req.params.requestId)
        if(!acceptedRequest) {
            return res.status(400).json({ err: 'an error occured during the operation' })
        }
        return res.status(200).json({ acceptedRequest, err: null })
    }
}