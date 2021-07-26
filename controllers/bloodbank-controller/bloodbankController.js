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

    /**
     * @route PUT /api/v1/bloodbank/cancel/:requestId
     * @returns the updated request details
     */
    static async cancelPendingRequest(req, res) {
        const cancelledRequest = await BloodbankService.rejectPendingRequest(req.params.requestId)
        if(!cancelledRequest) {
            return res.status(400).json({ err: 'an error occured during the operation' })
        }
        return res.status(200).json({ cancelledRequest, err: null })
    }

    /**
     * @route GET /api/v1/bloodbank/accepted-requests/:bloodbankId
     * @returns all the accepted requests
     */
    static async acceptedPendingRequest(req, res) {
        const acceptedRequests = await BloodbankService.approvedPendingRequests(req.params.bloodBankid)
        if(!acceptedRequests) {
            return res.status(400).json({ err: 'an error occured during the operation' })
        }
        return res.status(200).json({ acceptedRequests, err: null })
    }

     /**
     * @route GET /api/v1/bloodbank/cancelled-requests/:bloodbankId
     * @returns all the cancelled requests
     */
      static async cancelledPendingRequest(req, res) {
        const cancelledRequests = await BloodbankService.rejectedPendingRequests(req.params.bloodBankid)
        if(!cancelledRequests) {
            return res.status(400).json({ err: 'an error occured during the operation' })
        }
        return res.status(200).json({ cancelledRequests, err: null })
    }
}